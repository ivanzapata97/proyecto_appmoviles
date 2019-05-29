'use strict'

window.addEventListener('load', function() {
    var ciudad;
    var ubicaciones = [];

    var boton = document.querySelector("#buscar");
    boton.addEventListener('click', function() {
        ciudad = document.querySelector("#dato").value;
        $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/locations?query=' + ciudad,
            headers: {
                'user-key': '064b0fcd44a27aa8422530f9c73dcd44'
            },
            success: function(response) {
                ubicaciones = response.location_suggestions;
                localStorage.setItem('ubicaciones', JSON.stringify(ubicaciones));

                //guardo en el localstorage
                localStorage.setItem(ciudad, ciudad);

                window.location.href = 'resultados.html';
            }
        });
    })
    var historial = document.querySelector("#resultados");
    if (localStorage.length > 0) {
        document.querySelector("#historial").style.display = 'inline';
        var indice = localStorage.length;
        var i = 0;
        for (; i < indice; i++) {
            var prueba = localStorage.key(i);
            var contraprueba = localStorage.getItem(prueba);
            if (prueba == contraprueba) {
                var p = document.createElement('p');
                p.innerHTML = contraprueba;
                historial.appendChild(p);
            }
        }
    }
    var limpiar = document.querySelector("#limpiar");
    limpiar.addEventListener('click', function() {
        localStorage.clear();
        window.location.reload();
    });
});