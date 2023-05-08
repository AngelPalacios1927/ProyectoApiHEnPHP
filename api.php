<?php

// Obtener datos del formulario


// Conectar a la base de datos
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'proyectoapi';

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
  http_response_code(500);
  die('Error al conectar a la base de datos');
}


// Cerrar la conexión con la base de datos

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;
switch ($method) {
  case 'GET':
    if ($id) {
      // Lee un tipo de paquete específico
      $stmt = $conn ->prepare("SELECT id, date, hour, type, services FROM events WHERE id=?");
      $stmt->bind_param("i", $id);
    } else {
      // Lee todos los tipos de paquetes
      $stmt = $conn->prepare("SELECT id, date, hour, type, services FROM events");
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($data);
    break;

  case 'POST':
    $date = $_POST['date'];
    $type = $_POST['type'];
    $hour = $_POST['time'];
    $services = isset($_POST['services']) ? implode(',', $_POST['services']) : '';

    $sql = "SELECT date FROM events";

    $result = $conn->query($sql);
   
   
    if ($result->num_rows > 0) {
     while ($row = $result->fetch_assoc()) {
         if ($row['date'] == $date) {
             // Si se encuentra una coincidencia, mostrar un mensaje al usuario indicando que la fecha ya está registrada y no se puede guardar el evento
             http_response_code(409);
             exit();
         }
     }
   }
   $type = $_POST['type'];
   $hour = $_POST['time'];
   $services = implode(",", $_POST['services']);
   
   $sql = "INSERT INTO events (date, hour, type, services) VALUES ('$date', '$hour', '$type', '$services')";
   
   if ($conn->query($sql) === TRUE) {
     http_response_code(200);
   } else {
       echo "Error al registrar el evento: " . $conn->error;
   }
    break;

  case 'PUT':
    // Actualiza un tipo de paquete existente
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];
    $stmt = $conn->prepare("UPDATE paquetes SET name=?, description=?, price=? WHERE id=?");
    $stmt->bind_param("ssdi", $name, $description, $price, $id);
    if ($stmt->execute()) {
      echo "El tipo de paquete se ha actualizado correctamente";
    } else {
      echo "Error al actualizar el tipo de paquete: " . $conn->error;
    }
    break;

  case 'DELETE':
    // Elimina un tipo de paquete existente
    $stmt = $conn->prepare("DELETE FROM paquetes WHERE id=?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
      echo "El tipo de paquete se ha eliminado correctamente";
    } else {
      echo "Error al eliminar el tipo de paquete: " . $conn->error;
    }
    break;

  default:
    // Método HTTP no permitido
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET, POST, PUT, DELETE');
    echo "Método HTTP no permitido";
    break;
}
$conn->close();