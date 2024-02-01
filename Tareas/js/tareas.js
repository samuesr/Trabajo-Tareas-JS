$(document).ready(iniciar);
function iniciar() {
    listar();
    buscar();
    borrar();
    
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
                    $('#d_visualizar').text(data[0].descripcion);
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
        error: function(){window.alert('Se ha producido un error');}
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
            );
        }
    })
}