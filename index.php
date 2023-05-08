<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de Eventos</title>
    <link rel="stylesheet" href="style.css">
    
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

</head>
<body>
<header>
    <h1>Crear un evento</h1>
      <img src="logo.png" alt="Logo de la empresa" style="width: 200px; height: 100px;border-radius: 20%;">
      
    </header>
    <main> 
    <form id="event-form" action="api.php" method="POST">
        <label for="date-input">Fecha:</label>
        <input type="date" id="date-input" name="date" required>

        <label for="time-input">Hora:</label>
        <input type="time" id="time-input" name="time" required>

        
        <label for="type-input">Paquete:</label>
        <select id="type-input" name="type" required>
            <option value="">Seleccionar Paquete</option>
        </select>
        
        <label>Servicios:</label>
        <div id="contenedorCheckboxes"></div>

        <button type="submit">Guardar</button>
    
    </form>
    <button id="SC" class="cerrarsesion" >Cerrar Sesion</button>
    <div class="modal-overlay">
  <div class="modal">
    <h2>Resumen de compra</h2>
    <div id="productos"></div>
    <p> <span id="total"></span></p>
    <button id="confirmar-btn">Confirmar</button>
    <button id="cancelar-btn">Cancelar</button>
  </div>
</div>

<script src="app.js"></script>


</body>
</html>

