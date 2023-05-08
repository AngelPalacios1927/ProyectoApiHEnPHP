<!DOCTYPE html>
<html>
<head>
	<title>Formulario de registro de paquetes para eventos</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="stylepaquetes.css">
	<link rel="stylesheet" href="styleadmin.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</head>
<header>
	<nav>
		<ul>
			<li><a href="Admin.php">Inicio</a></li>
			<li><a href="servicios.php">Registrar servicios</a></li>
			
		</ul>
	</nav>
</header>

<body>
	<form id="event-form" method="post" action="apipaquetes.php">
		<h1>Registro de paquetes para eventos</h1>
		<label for="nombre">Nombre del paquete:</label>
		<input type="text" id="nombre" name="nombre" required>
		
		<label for="descripcion">Descripción:</label>
		<textarea id="descripcion" name="descripcion" required></textarea>

		<label for="precio">Precio:</label>
		<input type="number" id="precio" name="precio" min="0" step="0.01" required>
		
		<button type="submit">Enviar</button>
		<button id="ver-registros" onclick="verRegistros()">Ver registros</button>
	</form>
    
	
    
    <script src="Notificacion.js"></script>
</body>
</html>


