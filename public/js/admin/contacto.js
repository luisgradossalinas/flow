$(document).ready(function(){
    
$("#contacto-grid").jqGrid({
        url: urls.siteUrl + "/admin/contacto",
        datatype: "json",
        width:850,
        height:345,
        gridview: true,
        colNames:['N','Nombres','Celular','Correo','Mensaje','Fecha envío','Respondido'],
        colModel:[
        {name:'id', index:'id',width:20 ,align:'center',search:false},
        {name:'nombres', index:'nombres',width:150,align: "left",search:true},
        {name:'celular', index:'celular',width:100,align: "left",search:false},
        {name:'correo', index:'correo',width:150,align: "left",search:true},
        {name:'mensaje', index:'mensaje',width:150,height:80,align: "left",search:false},
        {name:'fecha_envio', index:'fecha_envio',width:100,align: "center",formatter:'date', formatoptions: {newformat:'d-m-Y'},search:false},
        {name:'respondido', index:'respondido',width:70,align:'center',search:false,
        formatter : function(value){
               if (value == 1)
                   return 'Sí';
               else if(value == 0)
                   return "No";
            }}
        ],
        caption: "Contáctenos",
        viewrecords: true, 
        rowNum:20, 
        rowList:[20,40,100],
        sortorder: "asc",
        pager: '#contacto-grid-page', 
        sortname: 'id'
    });
 $("#contacto-grid").jqGrid('filterToolbar');
 
$("#contacto-grid").jqGrid('navGrid',"#contacto-grid-page",{
    search:false,
    edit:false,
    add:false,
    del:false,
    refresh:true
});

$("#btn-create-contacto").button().click(function() {
      $.ajax({
        url: urls.siteUrl + "/admin/contacto/nueva-contacto/ajax/form",
        success: function(form){
            $('body').append("<div id='ventana-contacto'>" + form + "</div>");
            $('#ventana-contacto').dialog({
                height: 180,
                width: 580,
                title: "Nueva categoría",
                modal: true,
                resizable: false,
                buttons: {
                    "Crear categoría": function() {
                        dialog = $(this);
                        // validar formulario
                        $.ajax({
                            type:'post',
                            url: urls.siteUrl + "/admin/contacto/nueva-contacto/ajax/validar",
                            data: $('#form-contacto').serialize(),
                            success:function(json){
                                if(validarCampos(json)){
                                    // guardar recurso
                                    $.ajax({
                                        url: urls.siteUrl + '/admin/contacto/nueva-contacto/ajax/save',
                                        data: $("#form-contacto").serialize(),
                                        success: function(){
                                            dialog.dialog("close");
                                            $("#contacto-grid").trigger("reloadGrid");
                                            $('#ventana-contacto').remove();
                                        }
                                    });
                                }
                            }
                        });
                    },
                    Cancelar: function() {
                        $(this).dialog("close"); 
                        $('#ventana-contacto').remove();
                    }
                },
                close: function() {$("#ventana-contacto").remove();}
            });
        }
    });   
  });
  
   $("#btn-update-contacto").button().click(function(){
      var id_contacto = validarSeleccionLinea("#contacto-grid");
        if(!id_contacto){
             return false;
        }
    
      $.ajax({
        url: urls.siteUrl + "/admin/contacto/modificar-contacto/ajax/form/id/"+id_contacto,
        success: function(form){
            $('body').append("<div id='ventana-contacto'>" + form + "</div>");
            $('#ventana-contacto').dialog({
                height: 180,
                width: 580,
                title: "Modificar categoría",
                modal: true, 
                resizable: false,
                buttons: {
                    "Modificar": function() {
                        dialog = $(this);
                        // validar formulario
                        $.ajax({
                            type:'post',
                            url: urls.siteUrl + "/admin/contacto/modificar-contacto/ajax/validar",
                            data: $('#form-contacto').serialize(),
                            success:function(json){
                                if(validarCampos(json)){
                                    // guardar registro
                                    $.ajax({
                                        url: urls.siteUrl + '/admin/contacto/modificar-contacto/save/1/id/'+id_contacto,
                                        type:'post',
                                        data: $("#form-contacto").serialize(),
                                        success: function(){
                                            dialog.dialog("close");
                                            $("#contacto-grid").trigger("reloadGrid");
                                            $('#ventana-contacto').remove();
                                        }
                                    });
                                }
                            }
                        });
                    },
                    Cancelar: function() {
                        $(this).dialog("close");
                        $('#ventana-contacto').remove();
                    }
                },
                close: function() {$("#ventana-contacto").remove();}
            });
        }
    });
  })


})
