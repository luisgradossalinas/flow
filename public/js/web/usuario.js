var codigo = 0;
var sentencia_crud = '';
$(document).ready(function(){

     $("#btnOpen").click(function() {
         configModal(0, 'nuevo','Nuevo registro');
    });
        
    configModal = function(id, ope, titulo){
        codigo = id;
        sentencia_crud = ope;
        $.ajax({
            url: urls.siteUrl + '/admin/usuario/operacion/ajax/form',
            data:{id:id},
            type:'post',
            success: function(result) {
                
                $('#ventana-modal').empty().html(result);
                $(".v_numeric").numeric();
                $(".v_decimal").numeric(',');
                $(".v_datepicker").datepicker({
                    changeMonth: true,
                    changeYear: true
                    });
                    
                $("#padre").change(function(){
                    var padre = $("#padre").val();
                    
                    $.ajax({
                        url:urls.siteUrl + '/admin/recurso/num-recurso-correlativo',
                        data:{padre:padre},
                        type:'post',
                        dataType:'json',
                        success: function(result) {
                            $('#orden').val(result);
                        }
                        
                        
                    })
                    
               })
                   
                $('#ventana-modal').dialog({
                //height: 'auto',
                height:500,
                width: 620, //1050
                modal: true,
                //maxHeight: 400,
                resizable: false,
                title:titulo,
                buttons: {
                    "Guardar": function() {
                    dialog = $(this);
                    
                    $.ajax({
                    url: urls.siteUrl + '/admin/usuario/operacion/ajax/validar/ope/'+ope,
                    data: $('#form').serialize(),
                    type:'post',
                    success: function(result) {
                       if(validarCampos(result)){
                           $.ajax({
                               url: urls.siteUrl + '/admin/usuario/operacion/ajax/save/scrud/' + sentencia_crud + '/id/'+ codigo,
                               data: $("#form").serialize(),
                               success: function(result){
                                    location.reload();
                               }
                           });
                       }
                    }
                    })

                    },
                     "Cancelar": function() {
                       $(this).dialog("close");
                        
                    }
                },
                close: function() {//$("#ventana-modal").remove();
                }
                });
            }
        })     
    }
    
    nuevo = function() {
        configModal(0, 'nuevo','Nuevo registro');
    }
    
    editar = function(id){
        configModal(id, 'edit','Editar registro');
    }
    
    elimina = function(id){
        
        codigo = id;
   
                $('#ventana-modal').empty().html('¿Está seguro que desea eliminar registro?');
                $('#ventana-modal').dialog({
                height: 'auto',
                width: 350, 
                modal: true,
                resizable: false,
                title:'Mensaje del sistema',
                buttons: {
                    "Eliminar": function() {
                    dialog = $(this);
                    $.ajax({
                        url: urls.siteUrl + '/admin/usuario/operacion/ajax/delete',
                        data:{id:codigo},
                        success: function(result){
                            location.reload();
                        }
                    });
                    },
                     "Cancelar": function() {
                       $(this).dialog("close"); 
                    }
                },
                close: function() {//$("#ventana-modal").remove();
                }
                });
         
    }
    

 
  
})