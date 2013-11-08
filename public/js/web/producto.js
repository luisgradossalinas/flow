var codigo = 0;
var sentencia_crud = '';
$(document).ready(function(){
    
    verFoto = function(nombreFoto)
    {
        $("body").append("<div id=imagenProducto></div>");
        $("#imagenProducto").append("<center><img src='"+ urls.siteUrl +"/images/small/"+nombreFoto+"'></center>")
        $("#imagenProducto").dialog({
            width:400,
            height:400,
            title:'Imagen',
            modal:true,
            resizable:false,
            buttons:{
                "Cerrar":function(){
                    dialog = $(this);
                    dialog.dialog("close");
                }
            },
            close: function() {
                $("#imagenProducto").remove();
            }
        })  
    
    }
        
    configModal = function(id, ope, titulo){
        codigo = id;
        sentencia_crud = ope;
        $.ajax({
            url: urls.siteUrl + '/admin/mvc/operacion/ajax/form',
            data:{
                id:id
            },
            type:'post',
            success: function(result) {
                
                $('#ventana-modal').empty().html(result);
                
                $("#imagen-label").hide();
                imagen = 'photoEmpDefault.jpg';
                if (ope == 'edit') 
                    imagen = "large/" + $('#imagen').val();
                
                html = '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />'
                html += 'Imagen:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                html += '<img width="100" height="100" src="'+urls.siteUrl+'/images/'+imagen+'" id="fotoProducto" />';
                html += '<input name="fileFoto" type="hidden" id="fileFoto" value="'+imagen+'" />';
                
                $('#ventana-modal').append(html);
                
                new AjaxUpload('#fotoProducto', {
                    name: 'fileFoto',
                    action: urls.siteUrl + '/admin/auth/registrofoto/',
                    onSubmit : function(file, ext){
                        if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext))){
                            alert('Error: Solo se permiten imagenes');
                            return false;
                        }
                    },
                    onComplete: function(file, response){            
                        $('#fileFoto').attr('value', response);
                        $('#imagen').attr('value', response);
                        $('#fotoProducto').attr('src', urls.siteUrl +  '/images/' + response);
                    }
                });
                
                $(".v_numeric").numeric();
                $(".v_decimal").numeric(',');
                $(".v_datepicker").datepicker({
                    changeMonth: true,
                    changeYear: true
                });
                    
               
                   
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
                                url: urls.siteUrl + '/admin/mvc/operacion/ajax/validar',
                                data: $('#form').serialize(),
                                type:'post',
                                success: function(result) {
                                    if(validarCampos(result)){
                                        if ($('#fileFoto').val() == "photoEmpDefault.jpg") {
                                            alert("Selecciona imagen");
                                            return;
                                        }
                           
                                        $.ajax({
                                            url: urls.siteUrl + '/admin/mvc/operacion/ajax/save/scrud/' + sentencia_crud + '/id/'+ codigo,
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
    
    nuevoProd = function() {
        configModal(0, 'nuevo','Nuevo producto');
    }
    
    editarProd = function(id){
        configModal(id, 'edit','Editar producto');
    }
    
    eliminaProd = function(id){
        
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
                        url: urls.siteUrl + '/admin/mvc/operacion/ajax/delete',
                        data:{
                            id:codigo
                        },
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