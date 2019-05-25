'use strict'
window.addEventListener('load', function() {

    var ubicaciones = JSON.parse(localStorage.getItem('ubicaciones'));

    var establecimientos = document.querySelector("#resultados");

    var rest = [];

    var buscar = document.querySelector("#buscar");

    buscar.addEventListener('click', function() {
        var decision = document.querySelector("#decision").value;
        document.querySelector("#texto-resultado").style.display = 'inline';
        document.querySelector("#formulario").style.display = 'none';
        if (decision == "random") {
            $.ajax({
                url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + ubicaciones[0].entity_id + '&entity_type=city',
                headers: {
                    'user-key': '064b0fcd44a27aa8422530f9c73dcd44'
                },
                success: function(response) {
                    rest = response.restaurants;
                    var indice_restaurantes = rest.length;
                    var i = 0;
                    for (let indice of rest) {

                        var nombre = document.createElement('h3');
                        nombre.innerHTML = indice.restaurant.name;
                        establecimientos.appendChild(nombre);

                        var img = document.createElement('img');
                        img.setAttribute('src', indice.restaurant.featured_image);
                        img.setAttribute('alt', 'la bd no tiene foto');
                        img.setAttribute('width', '250px');
                        img.setAttribute('height', '250px');
                        establecimientos.appendChild(img);

                        var direccion = document.createElement('p');
                        direccion.innerHTML = "Direccion: " + indice.restaurant.location.address;
                        establecimientos.appendChild(direccion);

                        var rank = document.createElement('p');
                        rank.innerHTML = "Rank usuarios: " + indice.restaurant.user_rating.aggregate_rating;
                        establecimientos.appendChild(rank);

                        var enlace = document.createElement('a');
                        enlace.setAttribute('href', 'restaurante.html');
                        var identificador = 'identificador' + i;
                        enlace.setAttribute('id', identificador);
                        enlace.innerHTML = 'Ver';
                        establecimientos.appendChild(enlace);

                        var enlace_ver = document.querySelector("#identificador" + i);
                        enlace_ver.addEventListener('click', function() {
                            console.log(indice.restaurant);
                            localStorage.setItem('restaurante_elegido', indice.restaurant.R.res_id);
                            window.location.href = 'restaurante.html';
                        });

                        if (i < indice_restaurantes) {
                            var hr = document.createElement('hr');
                            hr.className = 'hr-separadora';
                            establecimientos.appendChild(hr);
                            i++;
                        }
                    }

                    var volver = document.querySelector("#volver");
                    volver.style.display = 'inline';
                    volver.addEventListener('click', function() {
                        window.location.href = 'Busqueda.html';
                    });
                }
            })
        }
        if (decision == "establecimientos") {
            $.ajax({
                url: 'https://developers.zomato.com/api/v2.1/establishments?city_id=' + ubicaciones[0].city_id,
                headers: {
                    'user-key': '064b0fcd44a27aa8422530f9c73dcd44'
                },
                success: function(response) {
                    rest = response.establishments;
                    console.log(rest);
                    var indice_establecimiento = rest.length;
                    var i = 0;
                    for (let indice of rest) {
                        var nombre = document.createElement('h3');
                        nombre.innerHTML = indice.establishment.name;
                        establecimientos.appendChild(nombre);

                        if (i < indice_establecimiento) {
                            var hr = document.createElement('hr');
                            hr.className = 'hr-separadora';
                            establecimientos.appendChild(hr);
                            i++;
                        }
                    }
                    var volver = document.querySelector("#volver");
                    volver.style.display = 'inline';
                    volver.addEventListener('click', function() {
                        window.location.href = 'Busqueda.html';
                    });
                }
            });
        }
        if (decision == "cocina") {
            $.ajax({
                url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=' + ubicaciones[0].city_id,
                headers: {
                    'user-key': '064b0fcd44a27aa8422530f9c73dcd44'
                },
                success: function(response) {
                    rest = response.cuisines;
                    console.log(rest);
                    var indice_establecimiento = rest.length;
                    var i = 0;

                    var parrafo = document.createElement('p');
                    parrafo.innerHTML = 'Estas son todas los tipos de comidas que estan disponibles en la ciudad';
                    establecimientos.appendChild(parrafo);

                    for (let indice of rest) {
                        var nombre = document.createElement('h3');
                        nombre.innerHTML = indice.cuisine.cuisine_name;
                        establecimientos.appendChild(nombre);


                        if (i < indice_establecimiento) {
                            var hr = document.createElement('hr');
                            hr.className = 'hr-separadora';
                            establecimientos.appendChild(hr);
                            i++;
                        }
                    }
                    var volver = document.querySelector("#volver");
                    volver.style.display = 'inline';
                    volver.addEventListener('click', function() {
                        window.location.href = 'Busqueda.html';
                    });
                }
            });
        }
    })
});