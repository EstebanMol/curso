
function getHeaders(){
    return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
    };
}


function cancelarEditarUsuario(){
   window.location.href = 'usuarios.html';
}

document.addEventListener('DOMContentLoaded', function() {

    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const usuario = {
        id: urlParams.get('id'),
        nombre: urlParams.get('nombre'),
        correo: urlParams.get('correo'),
        atributo: urlParams.get('atributo'),
        estado: urlParams.get('estado')

    };

    document.getElementById('txtId').value = usuario.id;
    document.getElementById('txtNombre').value = usuario.nombre;
    document.getElementById('txtEmail').value = usuario.correo;

    const selectAtributo = document.getElementById('selectAtributo');
    if (usuario.atributo) {
        selectAtributo.value = usuario.atributo;
    }
    const selectEstado = document.getElementById('selectEstado');
    if (usuario.estado) {
        selectEstado.value = usuario.estado;
    }

});

async function guardarEditarUsuario(){
  let datos = {};

  datos.id = document.getElementById('txtId').value;
  datos.nombre = document.getElementById('txtNombre').value;
  datos.email = document.getElementById('txtEmail').value;
  datos.atributo = document.getElementById('selectAtributo').value;
  datos.estado = document.getElementById('selectEstado').value;


  const requestUsuarios = await fetch('api/usuarios/editar', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)

  });

  //datos = await respuesta.json();

  if (requestUsuarios.ok) {
    alert("El registro fue actualizado con éxito");
    window.location.href = 'usuarios.html'; // Redirige a la página de usuarios
  } else {
    alert("Ocurrió un error al actualizar el registro");
  }


}
