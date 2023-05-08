<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "proyectoapi";
// Crea la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica si hubo errores en la conexión
if ($conn->connect_error) {
  die("Falló la conexión: " . $conn->connect_error);
}

// Verifica el método HTTP utilizado
$method = $_SERVER['REQUEST_METHOD'];

// Verifica si se está solicitando un ID específico
$name = isset($_GET['name']) ? $_GET['name'] : null;
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Ejecuta la operación correspondiente
switch ($method) {
  case 'GET':
    if ($name) {
      // Lee un tipo de paquete específico
      $stmt = $conn->prepare("SELECT id, name, description, price FROM paquetes WHERE name=?");
      $stmt->bind_param("s", $name);
    } else {
      // Lee todos los tipos de paquetes
      $stmt = $conn->prepare("SELECT id, name, description, price FROM paquetes");
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
    // Crea un nuevo tipo de paquete
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $stmt = $conn->prepare("INSERT INTO paquetes (name, description, price) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $nombre, $descripcion, $precio);
    if ($stmt->execute()) {
        http_response_code(200);
    } else {
      echo "Error al crear el tipo de paquete: " . $conn->error;
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
      http_response_code(200);
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

