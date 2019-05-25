'use strict'

window.addEventListener('load', function() {
    var div_restaurante = document.querySelector("#resultado");
    var div_botones = document.querySelector("#contenedor_boton");
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + localStorage.getItem('restaurante_elegido'),
        headers: {
            'user-key': '064b0fcd44a27aa8422530f9c73dcd44'
        },
        success: function(response) {
            var nombre = document.createElement('h3');
            nombre.innerHTML = response.name;
            div_restaurante.appendChild(nombre);

            var img = document.createElement('img');
            img.setAttribute('src', response.featured_image);
            img.setAttribute('alt', 'la bd no tiene foto');
            img.setAttribute('width', '250px');
            img.setAttribute('height', '250px');
            div_restaurante.appendChild(img);

            console.log(response);

            var i = 0;
            var compartir = document.createElement('a');
            compartir.setAttribute('href', 'compartir.html');
            var identificador = 'identificador' + i;
            compartir.setAttribute('id', identificador);
            compartir.innerHTML = 'Compartir';
            div_botones.appendChild(compartir);

            var volver = document.createElement('a');
            volver.setAttribute('href', 'Busqueda.html');
            volver.setAttribute('id', 'volviendo');
            volver.style.margin = '0 0 0 5px';
            volver.innerHTML = 'Volver';
            div_botones.appendChild(volver);


            var enlace_compartir = document.querySelector("#identificador" + i);
            enlace_compartir.addEventListener('click', function() {
                localStorage.setItem('compartir', response.url);
            });

            var enlace_volver = document.querySelector("#volviendo");
            enlace_volver.addEventListener('click', function() {
                window.location.href = 'Busqueda.html';
            });

            var ciudad = document.createElement('p');
            ciudad.innerHTML = "Ciudad: " + response.location.city;
            div_restaurante.appendChild(ciudad);

            var localidad = document.createElement('p');
            localidad.innerHTML = "Localidad: " + response.location.locality;
            div_restaurante.appendChild(localidad);

            var direccion = document.createElement('p');
            direccion.innerHTML = "direccion: " + response.location.address;
            div_restaurante.appendChild(direccion);

            var cocina = document.createElement('p');
            cocina.innerHTML = 'Tipo de cocina: ' + response.cuisines;
            div_restaurante.appendChild(cocina);

            var rank_user = document.createElement('p');
            rank_user.innerHTML = "Ranking usuarios: " + response.user_rating.aggregate_rating;
            div_restaurante.appendChild(rank_user);

            var rank_text = document.createElement('p');
            rank_text.innerHTML = "Trato a Comensales: " + response.user_rating.rating_text;
            div_restaurante.appendChild(rank_text);

        }
    })
});