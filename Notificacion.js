const form = document.getElementById('event-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
  
    
    
  
const formData = new FormData(form);
fetch(form.action, {
method: 'POST',
body: formData
})
.then(response => {
  if (response.ok) {
    Toastify({
      
      text: "¡Registro Exitoso!",
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
      text: "Falla al Registrar",
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
});
function verservicios() {
    window.location.href = "verservicios.php";
  }
  function verRegistros() {
    window.location.href = "verRegistro.php";
  }