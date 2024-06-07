// Call the dataTables jQuery plugin
$(document).ready(function() {
//on ready
});

async function registrarUsuario(){
  let datos = {};
  datos.nombre = document.getElementById('txtNombre').value;
  datos.email = document.getElementById('txtEmail').value;
  datos.password = document.getElementById('txtPassword').value;
  datos.atributo = document.getElementById('selectAtributos').value;
  datos.estado = 1;

  let repetirPassword = document.getElementById('txtRepetirPassword').value;

  if (repetirPassword != datos.password) {
    alert ('Las contraseñas son diferentes');
    return;
  }

  const requestUsuarios = await fetch('api/usuarios', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)

  };

  alert("La cuenta fue creada con éxito");
  window.location.href = 'login.html';

}



