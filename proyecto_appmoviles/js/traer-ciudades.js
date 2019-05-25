'use strict'

window.addEventListener('load', function() {
    var ciudades = [];

    var buscar = document.querySelector("#buscar");

    var div_resultados = document.querySelector("#resultados");

    var formulario = document.querySelector("#formulario");

    buscar.addEventListener('click', function() {
        var ciudad = document.querySelector("#dato").value;

        formulario.style.display = 'none';
        document.querySelector("#texto-resultado").style.display = 'inline';

        $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/cities?q=' + ciudad,
            headers: {
                'user-key': '064b0fcd44a27aa8422530f9c73dcd44'
            },
            success: function(response) {
                ciudades = response.location_suggestions;
                var indice_ciudades = ciudades.length;
                var i = 0;
                for (let indice of ciudades) {

                    var city = document.createElement('h3');
                    city.innerHTML = indice.name;
                    city.className = "textos";
                    div_resultados.appendChild(city);

                    if (i < indice_ciudades) {
                        var hr = document.createElement('hr');
                        hr.className = 'hr-separadora';
                        div_resultados.appendChild(hr);
                        i++;
                    }

                }
                document.querySelector("#volver").style.display = 'inline';
                document.querySelector("#volver").addEventListener('click', function() {
                    window.history.back();
                })
            }
        })
    })
});