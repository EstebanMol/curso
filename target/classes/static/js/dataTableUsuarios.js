// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
//alert("lalal")
  $('#dataTableUsuarios').DataTable();
});

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
    headers: getHeaders(),
  });
  const usuarios = await requestUsuarios.json();
  console.log(usuarios);


  let botonEditar ='<a href="#" class="btn btn-success btn-circle btn-sm"> <i class="fas fa-check"></i> </a>';

  let listadoHtml ='';
  for (let usuario of usuarios){
    let botonEliminar ='<a href="#" onclick = "eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let usuarioHtml = ' <tr> <td>'+usuario.id+'</td> <td> '+ usuario.nombre + ' '
                        + usuario.apellido +'</td> <td>'+usuario.email +'</td> <td>'
                        + usuario.telefono +
                        '</td> <td>'+botonEditar + botonEliminar + '   </td> </tr>'
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

   // para actulizar si se borra el registro
    location.reload();
}

