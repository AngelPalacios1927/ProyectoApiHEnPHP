const form = document.getElementById('event-form');

document.getElementById("SC").addEventListener("click", function() {
  // Reemplaza la entrada más reciente en el historial de navegación
  history.replaceState(null, null, "login.php");
  // Redirige a la nueva página
  location.href = "login.php";
});


form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  enviar();
  
  
});

// Animación de entrada de formulario

form.style.opacity = 0;
form.style.transform = 'translateY(-10px)';
form.style.transition = 'opacity 0.5s, transform 0.5s';
form.style.transitionTimingFunction = 'ease-out';

setTimeout(() => {
    form.style.opacity = 1;
    form.style.transform = 'translateY(0)';
}, 300);

// Verificación de campos vacíos al enviar el formulario
form.addEventListener('submit', (event) => {
    const dateInput = document.getElementById('date-input');
    const typeInput = document.getElementById('type-input');

    if (!dateInput.value || !typeInput.value) {
        event.preventDefault();
        alert('Por favor, llene todos los campos del formulario.');
    }
});

// Animación de checkbox al ser seleccionado
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkbox.nextElementSibling.style.color = 'green';
            checkbox.nextElementSibling.style.fontWeight = 'bold';
        } else {
            checkbox.nextElementSibling.style.color = 'inherit';
            checkbox.nextElementSibling.style.fontWeight = 'normal';
        }
    });

    

});


const typeInput = document.getElementById('type-input');
fetch('http://localhost/API/apipaquetes.php')
  .then(response => response.json())
  .then(data => {
    data.forEach(data => {
      const optionElement = document.createElement('option');
      optionElement.textContent = data.name; // aquí puedes usar innerHTML si necesitas añadir elementos HTML
      optionElement.value = data.name;
      typeInput.appendChild(optionElement);
    });
  })
  .catch(error => console.error(error));
  


  //============================================================================
  function enviar() {
    const checkboxesSeleccionados = document.querySelectorAll('input[type=checkbox]:checked');
    const serviciosSeleccionados = [];
    checkboxesSeleccionados.forEach(checkbox => {
      serviciosSeleccionados.push(checkbox.value);
      
      
    });
  

    //costos de servicios
  fetch('http://localhost/API/apiservicios.php')
  .then(response => response.json())
  .then(data => {
    let total = 0;
    serviciosSeleccionados.forEach(servicioSeleccionado => {
      const objetoServicio = data.find(objeto => objeto.name === servicioSeleccionado);
      if (objetoServicio) {
        const precio = objetoServicio.price;
        var precio2 = parseInt(precio);
        
        console.log(`Precio del servicio ${servicioSeleccionado}: ${precio2}`);
        total += precio2;
      } else {
        console.error(`No se encontró el objeto del servicio ${servicioSeleccionado}`);
      }
    });
    const selectElement = document.getElementById('type-input');

    const selectedOption = selectElement.options[selectElement.selectedIndex];
    console.log(`La fruta seleccionada es ${selectedOption.textContent} (${selectedOption.value})`);

    //costos de paquetes
fetch(`http://localhost/API/apipaquetes.php?name=${selectedOption.value}`)
.then(response => response.json())
.then(data => {
  
  // Actualizar el valor de la opción seleccionada con el precio devuelto por la API
  selectedOption.textContent = data[0].price;
  var precio3 = parseInt(selectedOption.textContent);
 
  var pagototal = total+precio3

  selectedOption.textContent = data[0].name;
  costos(serviciosSeleccionados,selectedOption.value,total,precio3,pagototal)
})
.catch(error => console.error(error));


  
    
    // Aquí podrías mostrar el total en el modal
  })
  .catch(error => console.error(error))

    

//===============================================================================================
}


  //solicitud de datos a la api de servicios
  fetch('http://localhost/API/apiservicios.php')
    .then(response => response.json())
    .then(data => {
      const servicios = data.map(servicio => servicio.name);
      const contenedorCheckboxes = document.getElementById("contenedorCheckboxes");
      servicios.forEach((servicio, index) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `service-${index}`;
        checkbox.name = "services[]";
        checkbox.value = servicio;
  
        const label = document.createElement("label");
        label.htmlFor = `service-${index}`;
        label.textContent = servicio;
  
        contenedorCheckboxes.appendChild(checkbox);
        contenedorCheckboxes.appendChild(label);
      });
    });
  


     

function costos(serviciosSeleccionados,selectedOption,precio2,precio3,pagototal){
   // Selecciona los elementos del DOM

   const modalOverlay = document.querySelector('.modal-overlay');
   const modal = document.querySelector('.modal');
   const total = document.querySelector('#total');
   const confirmarBtn = document.querySelector('#confirmar-btn');
   const cancelarBtn = document.querySelector('#cancelar-btn');

   // Agrega un event listener al botón "Mostrar Selección"
   
     // Muestra el modal-overlay
     modalOverlay.style.display = 'block';
     
     // Calcula el total a pagar y lo muestra en el modal
     const pre1 = precio2; // Precio de la selección
     const pre2 = precio3; // Precio de la selección
     const totalAPagar = pagototal;
     total.textContent = 'pagar1' + pre1;
     total.textContent = 'pagar2' + pre2;
     total.innerHTML = 'Paquete seleccionado: ' + selectedOption + '<br>' + 'Precio:' + precio3 + '<br>'+ 'Servicios seleccionados:' + serviciosSeleccionados + '<br>' + ' precio: ' + precio2 + '<br>' + 'Total a pagar: $' + totalAPagar;


   // Agrega un event listener al botón "Confirmar"
   confirmarBtn.addEventListener('click', function() {
     // Oculta el modal-overlay
     
     // Ejecuta la función para confirmar la compra
     confirmarCompra();
     modalOverlay.style.display = 'none';
     enviar3();
   });

   // Agrega un event listener al botón "Cancelar"
   cancelarBtn.addEventListener('click', function() {
     // Oculta el modal-overlay
     modalOverlay.style.display = 'none';
   });

   // Función para confirmar la compra
   function confirmarCompra() {
     // Aquí se puede agregar código para realizar alguna acción
     
   }
}
   


function enviar3(){

    // Enviar datos del formulario a la API
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
        if (response.ok) {
          Toastify({
            
            text: "¡Evento registrado exitosamente!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
          form.reset();
        } else {
          Toastify({
            text: "La Fecha ya esta reservada",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #EF0909, #DF3434)",
            },
            onClick: function(){} // Callback after click
          }).showToast()
        }
      
    })
    .catch(error => {
      alert('Error al guardar el registro');
    });

}
//===========================================================




