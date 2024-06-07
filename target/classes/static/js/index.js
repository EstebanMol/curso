// Call the dataTables jQuery plugin
$(document).ready(function() {
  actualizarEmailUsuarioLogueado();
});

function actualizarEmailUsuarioLogueado(){
    document.getElementById('txtEmailUsuarioLogueado').outerHTML = localStorage.email;
}


