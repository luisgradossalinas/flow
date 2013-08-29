$(document).ready(function(){
    
    $("#rol-grid").jqGrid({
        url: urls.siteUrl + "/admin/rol",
        datatype: "json",
        colNames:['Código', 'Nombre', 'Descripción','Estado','Estado2'],
        height: 320,
        width: 600,
        colModel:[
        {
            name:'id_rol',
            index:'id_rol', 
            width: 30,
            align:"center",
            search:false
        },

        {
            name:'nombre',
            index:'nombre',
            width:120
        },

        {
            name:'descripcion',
            index:'descripcion',
            width:150,
            search:false,
            formatter:function(value)
            {
                return "<span style='color:#1DA19B'>"+value+"</span>";
            }
        },
        {
            name:'estado',
            index:'estado',
            align:'center',
            width:80,
            search:false,
            formatter : function(value){
                if (value == null)
                    return '';
                else if(value == 1)
                    return "<img src="+ urls.siteUrl +"/images/icons/checkmark.png width=12% title='Activado'  alt='Activado'>";
                else if (value == 0)
                    return "<img src="+ urls.siteUrl +"/images/icons/error.png width=12% title='Desactivado' alt='Desactivado'>";
                else
                    return '';
            }
        },

        {
        name:'estado2',
        index:'estado2',
        width:10,
        hidden:true
    },
    ],
    caption: "Roles",
    viewrecords: true, 
    sortorder: "asc",
    pager: '#rol-grid-page',
    sortname: 'id'
    });
    
$("#rol-grid").jqGrid('filterToolbar');
    $("#rol-grid").jqGrid('navGrid',"#rol-grid-page",{
        search:false,
        edit:false,
        add:false,
        del:false,
        refresh:true
    });
    
    $("#btn-create-rol").button().click(function(){
        $.ajax({
            url: urls.siteUrl + "/admin/rol/nuevo-rol/ajax/form",
            success: function(form){
                $('body').append("<div id='ventana-rol'>" + form + "</div>");
                $('#ventana-rol').dialog({
                    height: 220,
                    width: 580,
                    title: "Nuevo rol",
                    modal: true,
                    resizable: false,
                    buttons: {
                        "Crear Rol": function() {
                            dialog = $(this);
                            // validar formulario
                            $.ajax({
                                type:'post',
                                url: urls.siteUrl + "/admin/rol/nuevo-rol/ajax/validar",
                                data: $('#form-rol').serialize(),
                                success:function(json){
                                    if(validarCampos(json)){
                                        // guardar rol
                                        $.ajax({
                                            url: urls.siteUrl + '/admin/rol/nuevo-rol/ajax/save',
                                            data: $("#form-rol").serialize(),
                                            success: function(){
                                                dialog.dialog("close");
                                                $("#rol-grid").trigger("reloadGrid");
                                                $('#ventana-rol').remove();
                                            }
                                        });
                                    }
                                }
                            });
                        },
                        Cancelar: function() {
                            $(this).dialog("close"); 
                            $('#ventana-rol').remove();
                        }
                    },
                    close: function() {
                        $("#ventana-rol").remove();
                    }
                });
            }
        });
      
      
    });
  
    $("#btn-update-rol").button().click(function(){
        var id_rol = validarSeleccionLinea("#rol-grid");
        if(!id_rol){
            return false;
        }
    
        $.ajax({
            url: urls.siteUrl + "/admin/rol/modificar-rol/ajax/form/id/"+id_rol,
            success: function(form){
                $('body').append("<div id='ventana-rol'>" + form + "</div>");
                $('#ventana-rol').dialog({
                    height: 220,
                    width: 580,
                    title: "Modificar rol",
                    modal: true, 
                    resizable: false,
                    buttons: {
                        "Modificar Rol": function() {
                            dialog = $(this);
                            // validar formulario
                            $.ajax({
                                type:'post',
                                url: urls.siteUrl + "/admin/rol/modificar-rol/ajax/validar",
                                data: $('#form-rol').serialize(),
                                success:function(json){
                                    if(validarCampos(json)){
                                        // guardar registro
                                        $.ajax({
                                            url: urls.siteUrl + '/admin/rol/modificar-rol/save/1/id/'+id_rol,
                                            type:'post',
                                            data: $("#form-rol").serialize(),
                                            success: function(){
                                                dialog.dialog("close");
                                                $("#rol-grid").trigger("reloadGrid");
                                                $('#ventana-rol').remove();
                                            }
                                        });
                                    }
                                }
                            });
                        },
                        Cancelar: function() {
                            $(this).dialog("close");
                            $('#ventana-rol').remove();
                        }
                    },
                    close: function() {
                        $("#ventana-rol").remove();
                    }
                });
            }
        });
    });
  
    $("#btn-add-recurso").button().click(function(){
      
      
        var id_rol = validarSeleccionLinea("#rol-grid");
        if(!id_rol){
            return false;
        }
        
        registro = $("#rol-grid").jqGrid('getRowData',id_rol);
        estado = registro.estado2;
     
        if (estado == 0)
        {
            jAlert("Mensaje del sistema","Para asignar permisos, el rol debe estar activo");
            return false;
        }
     
        var html = "";
     
        $.ajax({
            url: urls.siteUrl + "/admin/usuario/permisos/rol",
            type:"post",
            dataType:"json",
            data:{
                rol:id_rol
            },
            success: function(result)
            {
             
                html += '<form method="post">';
                html += '<table style="font-size:9pt">';
                html += '<th>Recurso</th>';
                html += '<th>Controller</th>';
                html += '<th>Url</th>';
                html += '<th>Acceso</th>';
             
                $.each(result,function(key,field){
                    html += "<tr>";  
                    html += "<td>"+field["nombre"]+"</td>";
                    html += "<td>"+field["key"]+"</td>";
                    html += "<td>"+field["url"]+"</td>";
                    html += "<td>"+field["acceso"]+"</td>";
                    html += "<tr>";
                })
                html += "</table>";
                html += "</form>";
                $("#grilla_det_recurso").empty().append(html);
             
            }
        })
      
        $("#grilla_det_recurso").dialog({
            height: 410,
            width: 1040,
            title: "Lista de recursos para el rol: " + registro.nombre,
            modal: true, 
            resizable: true,
            hide: {
                effect: 'drop', 
                direction: "down"
            },
            show: "slide", // { effect: 'drop', direction: "up" }
            buttons: {
                "Grabar recursos": function() {
                        
                    jAlert("Mensaje del sistema","Hola");
                      
                },
                Cancelar: function() {
                    $(this).dialog("close");

                }
            }//,close: function() {$(this).dialog("close");}
        });  
      
      
    });
  
})

