$(document).ready(init);

$(document).on('click', '.btn-secondary', function () {
    $('#carritoModal').modal('hide');
});

$(document).on('click', '.close', function () {
    $('#carritoModal').modal('hide');
});

function init() {
    $(document).on('click', '.btn-aumentar', function (e) {
        e.stopPropagation();
        var index = $(this).data('index');
        aumentarCantidad(index);
    });

    $(document).on('click', '.btn-disminuir', function (e) {
        e.stopPropagation();
        var index = $(this).data('index');
        disminuirCantidad(index);
    });

    $(document).on('click', '.btn-modal', function () {
        var producto = $(this).closest('.modal-container');
        var titulo = producto.find('h3').text();
        var img = producto.find('img').attr('src');
        var precio = producto.find('.price').text();

        agregarAlCarrito({
            titulo: titulo,
            img: img,
            precio: precio
        });

        alert('Producto agregado al carrito: ' + titulo);

        // Cerrar el modal correspondiente
        $(this).closest('.modal').modal('hide');
    });


    $('#carritoLink').click(function () {
        mostrarCarritoModal();
    });
   
    
    $.ajax({
        url: 'json/juegos.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#btnBuscar").on("click", function (e) {
                e.preventDefault();
                console.log("Botón de búsqueda clickeado");
                realizarBusqueda(data); 
            });
            
            function realizarBusqueda(data) {
                // Obtener el término de búsqueda y convertirlo a minúsculas
                var searchTerm = $("input[name='search']").val().toLowerCase().trim();
                console.log('Término de búsqueda:', searchTerm);
            
                // Filtrar juegos según el término de búsqueda
                var juegosFiltrados = data.juegosDeMesa.filter(function (juego) {
                    // Convertir el título del juego a minúsculas y buscar coincidencias parciales
                    return juego.titulo.toLowerCase().includes(searchTerm);
                });
            
                // Mostrar juegos en el contenedor correspondiente
                mostrarJuegos(juegosFiltrados, '#lupaContainer');
            
                // Mostrar una alerta si no se encontraron juegos
                if (searchTerm !== "" && juegosFiltrados.length === 0) {
                    // Vaciar el contenido del contenedor si no se encontraron juegos
                    $('#lupaContainer').empty();
            
                    alert("Lo siento, no se encontró un juego con ese término de búsqueda.");
                }
            }
            $(document).on('click', '.btn-info-modal', function () {
                
                var producto = $(this).closest('.modal-container');
                console.log('Producto:', producto);
            
                var titulo = producto.find('h3').text();
                console.log('Título:', titulo);
            
                var img = producto.find('img').attr('src');
                console.log('Imagen:', img);
            
                var descripcion = producto.find('.description').text();
                console.log('Descripción:', descripcion);
            
                var precio = producto.find('.price').text();
                console.log('Precio:', precio);
                
            
                // Actualiza el contenido del modal con la información del artículo
                $('#infoModalTitle').text(titulo);
                $('#infoModalImage').attr('src', img);
                $('#infoModalDescription').text(descripcion);
                $('#infoModalPrice').text(precio);
            
                 // Evento click para el botón "Comprar" en el modal de información
            $('#infoModalBuyBtn').on('click', function () {
                var titulo = $('#infoModalTitle').text();
                var img = $('#infoModalImage').attr('src');
                var precio = $('#infoModalPrice').text();
        
                // Agregar al carrito solo si el título está presente
                if (titulo) {
                    agregarAlCarrito({
                        titulo: titulo,
                        img: img,
                        precio: precio
                    });
        
                    alert('Producto agregado al carrito: ' + titulo);
                }
        
                // Cerrar el modal de información
                $('#infoModal').modal('hide');
            });
        
            
                // Abre el modal de información
                $('#infoModal').modal('show');
            });
            function centrarModalVerticalmente() {
                var modalDialog = $('.modal-dialog');
                var windowHeight = $(window).height();
                var modalHeight = modalDialog.height();
                var scrollTop = $(window).scrollTop();
            
                // Ajusta el espacio superior y resta 20px para dejarlo más arriba
                var marginTop = (windowHeight - modalHeight) / scrollTop + 200;
            
                // Si el modal es más grande que la ventana, deja un pequeño espacio superior (por ejemplo, 20px)
                if (modalHeight >= windowHeight) {
                    marginTop = scrollTop + 20;
                }
            
                modalDialog.css('margin-top', Math.max(marginTop, 0)); // Asegura que no sea un valor negativo
            }
            
        
            // Modificar el evento de mostrado del modal para centrarlo verticalmente
            $('#infoModal').on('shown.bs.modal', function () {
                centrarModalVerticalmente();
            });
        
            var juegosMasVendidos = data.juegosDeMesa.filter(function (juego) {
                return juego.masvendidos === true;
            }).slice(0, 8);

            mostrarJuegos(juegosMasVendidos, '#gamesContainer');

            var juegosNovedades = data.juegosDeMesa.filter(function (juego) {
                return juego.novedades === true;
            }).slice(0, 6);

            mostrarCarrusel(juegosNovedades, '#gamesnovContainer');

            var juegosOutlet = data.juegosDeMesa.filter(function (juego) {
                return juego.outlet === true;
            }).slice(0, 8);

            mostrarJuegos(juegosOutlet, '#gamesoutContainer');

            var juegosdeCartas = data.juegosDeMesa.filter(function (juego) {
                return juego.carta === true;
            });

            mostrarJuegos(juegosdeCartas, '#cartaContainer');

            var juegosMesa = data.juegosDeMesa.filter(function (juego) {
                return juego.mesa === true;
            });

            mostrarJuegos(juegosMesa, '#mesaContainer');

            var juegosdeRol = data.juegosDeMesa.filter(function (juego) {
                return juego.rol === true;
            });

            mostrarJuegos(juegosdeRol, '#rolContainer');

            var juegosRebajados = data.juegosDeMesa.filter(function (juego) {
                return juego.outlet === true;
            });

            mostrarJuegos(juegosRebajados, '#rebajadosContainer');

            var tapetes = data.juegosDeMesa.filter(function (juego) {
                return juego.tapetes === true;
            });

            mostrarJuegos(tapetes, '#tapetesContainer');

            var fundas = data.juegosDeMesa.filter(function (juego) {
                return juego.fundas === true;
            });

            mostrarJuegos(fundas, '#fundasContainer');

            var dados = data.juegosDeMesa.filter(function (juego) {
                return juego.dados === true;
            });

            mostrarJuegos(dados, '#dadosContainer');

            var juegosExistencias = data.juegosDeMesa.filter(function (juego) {
                return juego.existencias === true;
            });

            mostrarJuegos(juegosExistencias, '#existenciasContainer');
           
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema');
        },
        complete: function (xhr, status) {
            console.log('Petición realizada');
        }
    });

    $('#mesaContainer, #rolContainer, #cartaContainer, #rebajadosContainer, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerdados, .main-containerfundas').hide();

    $('.dropdown-item').click(function () {
        var categoria = $(this).data('categoria');

        $('#mesaContainer, #rolContainer, #cartaContainer, #rebajadosContainer, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerdados, .main-containerfundas').hide();

        switch (categoria) {
            case 'mesa':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containermesa').show();
                $('#mesaContainer').show();
                break;
            case 'rol':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containerrol').show();
                $('#rolContainer').show();
                break;
            case 'carta':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containercarta').show();
                $('#cartaContainer').show();
                break;
            case 'rebajados':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containerrebajados').show();
                $('#rebajadosContainer').show();
                break;
            case 'existencias':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containerexistencias').show();
                $('#existenciasContainer').show();
                break;
            case 'tapetes':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containertapetes').show();
                $('#tapetesContainer').show();
                break;
            case 'fundas':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containerfundas').show();
                $('#fundasContainer').show();
                break;
            case 'dados':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containerdados').show();
                $('#dadosContainer').show();
                break;
            case 'lupa':
                $('#superventasContainer, #novoContainer, #rebajaContainer, #mesaContainer, #rolContainer, #cartaContainer, .ninots, .listillo, .main-containercarta, .main-containermesa, .main-containerrol, .main-containerrebajados, .main-containerexistencias, .main-containerlupa, .main-containertapetes, .main-containerfundas, .main-containerdados').hide();
                $('.main-containerlupa').show();
                $('#lupaContainer').show();
                break;
            default:
                break;
        }
    });
}

function mostrarJuegos(juegos, containerId) {
    console.log('Mostrando juegos...');
    var gamesContainer = $(containerId);
    gamesContainer.find('.modal-container').empty();

    $.each(juegos, function (index, juego) {
        var nuevoJuego = $('<div class="col-md-3">' +
            '<div class="modal-container">' +
            '<img src="' + juego.img + '" alt="' + juego.titulo + '">' +
            '<h3>' + juego.titulo + '</h3>' +
            '<p class="price">' + juego.precio + '</p>' +
            '<p class="description" style="display: none;">' + juego.descripcion + '</p>' +
            '<button class="btn btn-primary btn-info-modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> + Info</button>' +
            '<br>' +
            '<button class="btn btn-primary btn-modal" data-toggle="modal" data-target="#gameModal1">Comprar</button>' +
            '</div>' +
            '</div>');

        gamesContainer.append(nuevoJuego);
    });
     
}

function mostrarCarrusel(juegos, containerId) {
    var carruselContainer = $(containerId);

    var carruselHTML = `
    <section>
        <div class="container">
            <div class="carousel">`;

    for (var i = 0; i < juegos.length; i++) {
        carruselHTML += `
                <input type="radio" name="slides" ${i === 0 ? 'checked="checked"' : ''} id="slide-${i + 1}">
                `;
    }

    carruselHTML += `
                <ul class="carousel__slides">`;

    for (var i = 0; i < juegos.length; i++) {
        carruselHTML += `
                    <li class="carousel__slide">
                        <figure>
                            <div>
                                <img class="imagencarrusel" src="${juegos[i].img}" alt="${juegos[i].titulo}">
                            </div>
                            <figcaption>
                                ${juegos[i].descripcion}
                                <span class="credit">${juegos[i].titulo}</span>
                                <p class="price">${juegos[i].precio}</p>
                                <button class="btn btn-primary btn-modal" data-toggle="modal" id="boton-carrusel" data-target="#gameModal1">Comprar</button>
                            </figcaption>
                        </figure>
                    </li>
                    `;
    }

    carruselHTML += `
                </ul>
                <ul class="carousel__thumbnails">`;

    for (var i = 0; i < juegos.length; i++) {
        carruselHTML += `
                    <li>
                        <label for="slide-${i + 1}"><img class="img" src="${juegos[i].img}" alt="${juegos[i].titulo}"></label>
                    </li>
                    `;
    }

    carruselHTML += `
                </ul>
            </div>
        </div>
    </section>
`;

    carruselContainer.append(carruselHTML);
}

function agregarAlCarrito(producto) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    var productoExistente = carrito.find(item => item.titulo === producto.titulo);

    if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad inicial 1
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    console.log('Producto agregado al carrito:', producto);
}

function mostrarCarritoModal() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    $('#carritoModalBody').empty();

    $.each(carrito, function (index, juego) {
        var productoHTML = $('<div class="carritocompras">' +
            '<img src="' + juego.img + '" alt="' + juego.titulo + '">' +
            '<h4>' + juego.titulo + '</h4>' +
            '<p class="price">' + juego.precio + '</p>' +
            '<div class="cantidad-container">' +
            '<button class="btn btn-secondary btn-disminuir" data-index="' + index + '">-</button>' +
            '<span class="cantidad">' + juego.cantidad + '</span>' +
            '<button class="btn btn-secondary btn-aumentar" data-index="' + index + '">+</button>' +
            '</div>' +
            '<button class="btn btn-danger btn-eliminar" data-index="' + index + '"><img src="./img/papelera.png"></button>' +
            '</div>');

        $('#carritoModalBody').append(productoHTML);
    });

    $('#carritoModal').modal('show');
    actualizarTotalCarrito();

    $('.btn-eliminar').click(function () {
        var index = $(this).data('index');
        eliminarDelCarrito(index);
    });
    $('.btn-disminuir').click(function (e) {
        e.stopPropagation(); 
        var index = $(this).data('index');
        disminuirCantidad(index);
    });

    $('.btn-aumentar').click(function (e) {
        e.stopPropagation();
        var index = $(this).data('index');
        aumentarCantidad(index);
    });

    $('#carritoModal').modal('show');
}
function aumentarCantidad(index) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad++;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarritoModal();
}

function disminuirCantidad(index) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarritoModal();
    }
}
function actualizarTotalCarrito() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var total = 0;

    $.each(carrito, function (index, juego) {
        total += parseFloat(juego.precio.replace('€', '')) * juego.cantidad;
    });

    $('#totalCarrito').text('Total: €' + total.toFixed(2));

    // mostrar el total
    $('.totalcompra h4').text('Total:   ' + total.toFixed(2) + '€');
}
// función actualizar Carrito 
actualizarTotalCarrito();

function eliminarDelCarrito(index) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarritoModal();
}