$(document).ready(iniciar);
function iniciar() {
    listar();
    buscar();
    borrar();
    $('#t_buscar').keyup(filtrar);
    $('#b_v_guardar').click(crear);
    $('#b_v_modificar').click(modificar)
}

function crear() {
    // guardamos los datos puestos en el formulario
    var nom = $('#t_visualizar').val();
    var desc = $('#d_visualizar').val();
    if (nom != "" & desc != "") {
        $.ajax({
            type: 'POST',
            url: "php/crear.php",
            async: true, // no es obligatorio
            data: {
                nombre: nom,
                descripcion: desc,
                nocache: Math.random()
            },
            dataType: "json",
            success: function () {
                listar();
                limpiar_div_visualizar();
            },
            error: function () { window.alert('Se ha producido un error al Crear,\nrecuerde que el nombre es CLAVE ÚNICA'); }
        });
    } else {
        window.alert('No se pueden incluir notas con campos vacios');
    }
}

function filtrar() {
    // mandamos a buscar los datos que coincidan con el texto introducido   
    var texto = $('#t_buscar').val();
    if (texto != '') {
        $.ajax({
            type: 'POST',
            url: "php/filtrar.php",
            async: true, // no es obligatorio
            data: { nombre: texto, nocache: Math.random() },
            dataType: "json",
            success: function (datos) {
                // Metemos los datos en la tabla de listar     
                // mostramos la informacion en una tabla dentro del div_listar
                $('#id_tbody').empty();
                $(datos).each(function () {
                    $('#id_tbody').append('<tr>');
                    $('#id_tbody').append('<td>' + this.id + '</td><td>' + this.nombre + '</td><td>' + this.descripcion + '</td>');
                    $('#id_tbody').append('<td><input type="button" value="Borrar" atr_borrar="' + this.id + '"></td>');
                    $('#id_tbody').append('<td><input type="button" value="Modificar" atr_modificar="' + this.id + '"</td>');
                    $('#id_tbody').append('</tr>');
                });
                // lo habiamos puesto primero como una lista aparte que se cargaba en un div
                /* $('#div_filtrar').empty();
                $('#div_filtrar').show();
                var cadena = "<ul>";
                $(datos).each(function (indice, elem) {                            
                cadena += '<li>'+ this.nombre +'</li>';                                   
                });
                cadena += "</ul>";            
                $('#div_filtrar').html(cadena);      */
            },
            error: function () { window.alert('Se ha producido un error al filtrar'); }
        });
    } else {
        // Si el campo de filtro esta vacio, volcamos todo lo de la bbdd en el div_listar
        listar();
    }
}

function buscar() {
    $('table').click((e) => {
        if ($(e.target).attr('atr_modificar')) {
            id = $(e.target).attr('atr_modificar');
            $.getJSON("./php/buscar.php", { t_id: id, nocache: Math.random() },
                function (data) {
                    $('#id_visualizar').val(data[0].id);
                    $('#t_visualizar').val(data[0].nombre);
                    $('#d_visualizar').val(data[0].descripcion);
                    $('#b_v_guardar').hide();
                    $('#b_v_modificar').css('display','block');
                }
            );
        }
    })
}
function listar() {
    $.ajax({
        type: 'POST',
        url: "php/listar.php",
        async: true, // no es obligatorio
        data: { "nocache": + Math.random() },
        dataType: "json",
        success: function (datos) {
            // mostramos la informacion en una tabla dentro del div_listar
            $('#id_tbody').empty();
            $(datos).each(function () {
                var fila=$('<tr/>').append(
                    $('<td/>').text(this.id),
                    $('<td/>').text(this.nombre),
                    $('<td/>').text(this.descripcion),
                    $('<td/>').append('<input type="button" value="Borrar" atr_borrar="' + this.id + '"> '),
                    $('<td/>').append('<input type="button" value="Modificar" atr_modificar="' + this.id + '"> '))
               /* $('#id_tbody').append('<tr/>');
                $('#id_tbody').append('<td>' + this.id + '</td><td>' + this.nombre + '</td><td>' + this.descripcion + '</td>');
                $('#id_tbody').append('<td><input type="button" value="Borrar" atr_borrar="' + this.id + '"> ');
                $('#id_tbody').append('<input type="button" value="Modificar" atr_modificar="' + this.id + '"</td>');
                $('#id_tbody').append('</tr>');*/
                $(fila).appendTo('#id_tbody');
            });
        },
        error: function () { window.alert('Se ha producido un error al listar'); }
    });
}
function borrar() {
    $('table').click((e) => {
        if ($(e.target).attr('atr_borrar')) {
            id = $(e.target).attr('atr_borrar');
            $.get("./php/eliminar.php", { t_id: id, nocache: Math.random() },
                function () {
                    listar();
                },
            );
        }
    })
}
function modificar() {
    $.get("./php/modificar.php",
        {
            id: $('#id_visualizar').val(), nombre: $('#t_visualizar').val(),
            descripcion: $('#d_visualizar').val(), nocache: Math.random()
        },
        function () {
            listar();
            $('#id_formulario').trigger('reset');
            $('#b_v_guardar').show();
            $('#b_v_modificar').hide();
            limpiar_div_visualizar();
        }
    );
}

function limpiar_div_visualizar() {
    // limpiar los campos del div de crear tareas
    $('#t_visualizar').val('');
    $('#d_visualizar').val('');
}