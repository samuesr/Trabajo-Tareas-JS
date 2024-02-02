$(document).ready(iniciar);
function iniciar() {
    listar();
    buscar();
    borrar();
    
    $('#t_buscar').keyup(filtrar);
    $('#b_v_guardar').click(crear);
    $('#b_v_modificar').click(modificar)
    
}

function crear(){
    // guardamos los datos puestos en el formulario
    var nom = $('#t_visualizar').val();;
    var desc = $('#d_visualizar').val();;
    $.ajax({
        type:'POST',
        url:"php/crear.php",
        async:true, // no es obligatorio
        data:  { nombre : nom, 
                 descripcion : desc,
                 nocache: Math.random()},
        dataType: "json",
        success: function (datos) {              
            listar();            
        },
        error: function(){window.alert('Se ha producido un error al Crear,\nrecuerde que el nombre es CLAVE ÚNICA');}
    });
}


function filtrar() {
    // mandamos a buscar los datos que coincidan con el texto introducido   
    var texto = $('#t_buscar').val();
    console.log($('#t_buscar').val());
    if (texto!='') {
        $.ajax({
        type:'POST',
        url:"php/filtrar.php",
        async:true, // no es obligatorio
        data:  { nombre:texto, nocache: Math.random()},
        dataType: "json",
        success: function (datos) {              
            $('#div_filtrar').empty();
            $('#div_filtrar').show();
            var cadena = "<ul>";
            $(datos).each(function (indice, elem) {                            
               cadena += '<li>'+ this.nombre +'</li>';                                   
            });
            cadena += "</ul>";            
            $('#div_filtrar').html(cadena);            
        },
        error: function(){window.alert('Se ha producido un error al filtrar');}
    });
    } else{
        $('#div_filtrar').empty();
            $('#div_filtrar').hide();
    }
    
}

function buscar() { 
    $('table').click((e)=>{
        if($(e.target).attr('atr_modificar')){
            id=$(e.target).attr('atr_modificar');
            $.getJSON("./php/buscar.php", {t_id:id, nocache: Math.random()},
                function (data) {
                    console.log(data);
                    $('#id_visualizar').val(data[0].id);
                    $('#t_visualizar').val(data[0].nombre);
                    $('#d_visualizar').val(data[0].descripcion);
                    $('#b_v_guardar').hide();
                    $('#b_v_modificar').show();
                }
            );
        }
    })
 }
 function listar(){
    $.ajax({
        type:'POST',
        url:"php/listar.php",
        async:true, // no es obligatorio
        data: {"nocache": + Math.random()},
        dataType: "json",
        success: function (datos) {     
            // mostramos la informacion en una tabla dentro del div_listar
            $('#id_tbody').empty();
            
            $(datos).each ( function() {
                $('#id_tbody').append('<tr>');                          
                $('#id_tbody').append('<td>'+ this.id + '</td><td>' + this.nombre + '</td><td>' + this.descripcion +'</td>');                        
                $('#id_tbody').append('<td><input type="button" value="Borrar" atr_borrar="' + this.id + '"> ');
                $('#id_tbody').append('<input type="button" value="Modificar" atr_modificar="' + this.id + '"</td>');                    
                $('#id_tbody').append('</tr>' );   
            });
        },
        error: function(){window.alert('Se ha producido un error al listar');}
    });
}
function borrar() {
    $('table').click((e)=>{
        if($(e.target).attr('atr_borrar')){
            id=$(e.target).attr('atr_borrar');
            $.getJSON("./php/eliminar.php", {t_id:id, nocache: Math.random()},
                function () {
                    listar();
                }
            )
        }
    })
}
function modificar() {
    $.getJSON("./php/modificar.php", {id:$('#id_visualizar').val(),nombre:$('#t_visualizar').val(),descripcion:$('#d_visualizar').val(),nocache:Math.random()},
        function () {
            listar();
            $('#id_formulario').trigger('reset');
            $('#b_v_guardar').show();
            $('#b_v_modificar').hide();
        }
    );
}
