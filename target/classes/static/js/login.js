// Call the dataTables jQuery plugin
$(document).ready(function() {
//on ready
});


async function iniciarSesion(){
  let datos = {};
  datos.email = document.getElementById('txtEmail').value;
  datos.password = document.getElementById('txtPassword').value;

  const requestUsuarios = await fetch('api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)

  });

  const respuesta = await requestUsuarios.text();

  if (respuesta != 'FAIL') {
    localStorage.token = respuesta;
    localStorage.email = datos.email;
    window.location.href = "index.html"
  } else {
    alert ("Credenciales incorrectas o Usuario inhabilitado")
  }

}