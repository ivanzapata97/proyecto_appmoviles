'use strict'

window.addEventListener('load', function() {

    var enlace = document.createElement('a');
    enlace.setAttribute('href', '#');
    enlace.setAttribute('type', 'button');
    enlace.innerHTML = 'Compartir';

    var div_formulario = document.querySelector("#compartir");
    div_formulario.appendChild(enlace);

    enlace.addEventListener('click', function() {
        var destino = document.querySelector("#destino").value;
        var mensaje = document.querySelector("#mensaje").value;

        enlace.setAttribute('href', 'mailto:' + destino + '?body=' + mensaje + '. El enlace es: ' + localStorage.getItem('compartir'));
        window.location.href = 'Busqueda.html';

    });
    var volver = document.createElement('a');
    volver.setAttribute('type', 'button');
    volver.style.margin = '0 0 0 2px';
    volver.innerHTML = 'Atras';


    div_formulario.appendChild(volver);

    volver.addEventListener('click', function() {
        window.history.back();
    });

});