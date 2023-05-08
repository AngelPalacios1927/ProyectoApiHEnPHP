<!DOCTYPE html>
<html>
<head>
	<title>Formulario de registro de paquetes para eventos</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="styleservicios.css">
	<link rel="stylesheet" href="styleadmin.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</head>

<body>
<header>
	<nav>
		<ul>
			<li><a href="Admin.php">Inicio</a></li>
			<li><a href="Paquetes.php">Registrar paquetes</a></li>
			
		</ul>
	</nav>
</header>
	<form id="event-form" method="post" action="apiservicios.php">
		<h1>Registro de servicios para eventos</h1>
		<label for="nombre">Nombre del servicio:</label>
		<input type="text" id="nombre" name="nombre" required>
		<label for="descripcion">Descripción:</label>
		<textarea id="descripcion" name="descripcion" required></textarea>
		<label for="precio">Precio:</label>
		<input type="number" id="precio" name="precio" min="0" step="0.01" required>
		<button type="submit">Enviar</button>
        <button id="ver-registros" onclick="verservicios()">Ver registros</button>
	</form>
    
	
    <script src="Notificacion.js"></script>

</body>
</html>


