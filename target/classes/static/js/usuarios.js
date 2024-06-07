// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#dataTableUsuarios').DataTable();
  actualizarEmailUsuarioLogueado();
});

function actualizarEmailUsuarioLogueado(){
    document.getElementById('txtEmailUsuarioLogueado').outerHTML = localStorage.email;
}


function getHeaders(){
    return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
    };
}

async function cargarUsuarios(){

  const requestUsuarios = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
  });
  const usuarios = await requestUsuarios.json();
  console.log(usuarios);


  let listadoHtml ='';
  for (let usuario of usuarios){
    let botonEditar ='<a href="#" onclick = "editarUsuario('+usuario.id+')" class="btn btn-success btn-circle btn-sm" title="Editar"> <i class="fas fa-check"></i> </a>';
    let botonEliminar ='<a href="#" onclick = "eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm" title="Eliminar"><i class="fas fa-trash"></i></a>';

    let atributo ='Administrador';
    if (usuario.atributo == 2){
        atributo = 'Carga y Consulta';
    }
    if (usuario.atributo == 3){
        atributo = 'Consulta';
    }
    let estado ='Habilitado';
    if (usuario.estado == 2){
        estado = 'Inhabilitado';
    }

    let usuarioHtml = ' <tr> <td>'+usuario.id+'</td> <td> '+ usuario.nombre + '</td> <td>'+usuario.email +'</td> <td>'
                        + atributo + '</td> <td> ' + estado + '</td>'+
                        '<td>'+botonEditar + botonEliminar + '   </td> </tr>'
    listadoHtml += usuarioHtml;
  }

  document.querySelector('#dataTableUsuarios tbody').outerHTML = listadoHtml;

}


async function eliminarUsuario(id){
    //alert(id);

    if (!confirm('¿Desea eliminar este usuario?')){
        return;
    }
    const requestUsuarios = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders()
      });

   // para actualizar si se borra el registro
    location.reload();
}

async function editarUsuario(id){
    //alert(id)

    const requestUsuarios = await fetch('api/usuarios/editar/' + id, {
        method: 'GET',
        headers: getHeaders()
      });

    const usuario = await requestUsuarios.json();
    console.log(usuario);
    //alert (usuarios);

    const url = `editarUsuario.html?id=${usuario.id}&nombre=${encodeURIComponent(usuario.nombre)}&correo=${encodeURIComponent(usuario.email)}&atributo=${encodeURIComponent(usuario.atributo)}&estado=${encodeURIComponent(usuario.estado)}`;

    // Redirigir al usuario a usuario.html con los parámetros de usuario
    window.location.href = url;

}

