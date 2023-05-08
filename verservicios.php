<link rel="stylesheet" type="text/css" href="styleservicios.css">
<link rel="stylesheet" href="styleadmin.css">
<header>
	<nav>
		<ul>
			<li><a href="Admin.php">Inicio</a></li>
			<li><a href="Paquetes.php">Registrar paquetes</a></li>
			<li><a href="verRegistro.php">Ver paquetes</a></li>
			<li><a href="servicios.php">Registrar servicios</a></li>
		</ul>
	</nav>
  
</header>
<table id="myTable">
  <thead>
  <h1>Lista de servicios registrados para eventos</h1>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Precio</th>
    </tr>
  </thead>
  <tbody>
  </tbody>

</table>
<!-- Modal para editar registro -->
<div id="editModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Editar registro</h2>
    <form id="editForm">
      <input type="hidden" id="editId" name="id">
      <label for="editName">Nombre:</label>
      <input type="text" id="editName" name="name">
      <label for="editDescription">Descripción:</label>
      <textarea id="editDescription" name="description"></textarea>
      <label for="editPrice">Precio:</label>
      <input type="text" id="editPrice" name="price">
      <input type="submit" value="Actualizar">
    </form>
  </div>
</div>
<script src="scriptservicios.js"></script>