
        
              
  
          fetch('http://localhost/API/apiservicios.php')
            .then(response => response.json())
            .then(data => {
              // Recorrer los registros y agregar cada uno a la tabla
              
                  //const datosJSONString = JSON.stringify(data);
                  
                  
                  const table = document.getElementById('myTable');
                  // Recorrer el array y generar las filas de la tabla
                 // Recorrer el array y generar las filas de la tabla
                  data.forEach(registro => {
                      const row = table.insertRow();
                      row.insertCell(0).textContent = registro.id;
                      row.insertCell(1).textContent = registro.name;
                      row.insertCell(2).textContent = registro.description;
                      row.insertCell(3).textContent = registro.price;
                      
                       // Crear botón de editar
                  const editButton = document.createElement('button');
                  editButton.textContent = 'Editar';
                  editButton.setAttribute('data-id', registro.id);
                  editButton.addEventListener('click', () => {
                  editPost(registro.id);
                  });
              
                  // Crear botón de eliminar
                  const deleteButton = document.createElement('button');
                  deleteButton.textContent = 'Eliminar';
                  deleteButton.setAttribute('data-id', registro.id);
                  deleteButton.addEventListener('click', () => {
                  deletePost(registro.id);
                  });
              
                  // Agregar botones a la fila
                  const cell = row.insertCell();
                  cell.appendChild(editButton);
                  cell.appendChild(deleteButton);
                  });
                 
    
            })
            .catch(error => console.error(error));
            const editButton = row.querySelector('.edit');
            editButton.addEventListener('click', () => {
              
            // Obtener el ID del registro a editar
            const postId = editButton.getAttribute('data-id');
            // Llamar a la función para editar el registro
            editPost(postId);
            });
  
            // Agregar evento de clic para el botón de eliminar
            const deleteButton = row.querySelector('.delete');
            deleteButton.addEventListener('click', () => {
            // Obtener el ID del registro a eliminar
            const postId = deleteButton.getAttribute('data-id');
            // Llamar a la función para eliminar el registro
            deletePost(postId);
            });
  
            // Función para eliminar un registro
  function deletePost(id) {
      fetch(`http://localhost/API/apiservicios.php?id=${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          alert('Registro eliminado exitosamente');
          window.location.reload();
        } else {
          throw new Error('Error al eliminar registro');
        }
      })
      .catch(error => console.error(error));
    }
  
  
   function editPost(id){
  
   
    // Obtener la tabla y el modal
  const table = document.getElementById('myTable');
  const modal = document.getElementById('editModal');
  
  // Agregar evento de clic a cada fila de la tabla
  table.addEventListener('click', e => {
    const row = e.target.closest('tr');
    if (row) {
      // Obtener los datos del registro correspondiente a la fila seleccionada
      const id = row.cells[0].textContent;
      const name = row.cells[1].textContent;
      const description = row.cells[2].textContent;
      const price = row.cells[3].textContent;
      // Rellenar los campos del formulario del modal con los datos del registro
      document.getElementById('editId').value = id;
      document.getElementById('editName').value = name;
      document.getElementById('editDescription').value = description;
      document.getElementById('editPrice').value = price;
      // Mostrar el modal
      modal.style.display = 'block';
    }
  });
  
  // Agregar evento de clic al botón de cerrar el modal
  const close = modal.querySelector('.close');
  close.addEventListener('click', () => {
    // Ocultar el modal
    modal.style.display = 'none';
  });
  
  
  const editForm = document.getElementById('editForm');
  
  // Agregar evento de clic al botón de actualizar del formulario del modal
  editForm.addEventListener('submit', e => {
    //e.preventDefault();
    // Obtener los valores actualizados del formulario
    const id = document.getElementById('editId').value;
    const name = document.getElementById('editName').value;
    const description = document.getElementById('editDescription').value;
    const price = document.getElementById('editPrice').value;
  
    const myObject = {
      name: name,
      description: description,
      price: price
    };
    const json = JSON.stringify(myObject);
    //alert(json);
  
      
  
    // Realizar una solicitud PUT a la API para actualizar el registro
    fetch(`http://localhost/API/apiservicios.php?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: json
    })
    .then(response => response.json())
    .then(data => {
      alert('Registro eliminado exitosamente');
      window.location.reload();
      // Actualizar los valores en la tabla
      
      const row = table.querySelector(`tr[data-id="${id}"]`);
      row.cells[0].textContent = data.name;
      row.cells[1].textContent = data.description;
      row.cells[2].textContent = data.price;
      
      // Ocultar el modal
      modal.style.display = 'none';
      
    })
    
    .catch(error => console.error(error));
  });
  
   }