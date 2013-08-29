$(document).ready(function(){
    $("#usuarios-grid").jqGrid({
        url: urls.siteUrl + "/admin/usuario",
        datatype: "json",
        colNames:['Código', 'Nombres', 'Apellidos','Correo','Celular','Tipo','Opción'],
        height: 200,
        width: 1000,
        colModel:[
        {
            name:'id',
            index:'id', 
            width: 30,
            align:"center",
            search:false
        },

        {
            name:'nombres',
            index:'nombres',
            width:120
        },

        {
            name:'apellidos',
            index:'apellidos', 
            search:true,
            width:150
        },

        {
            name:'email',
            index:'email',
            width:150,
            search:false
        },

        {
            name:'celular',
            index:'celular',
            width:80,
            search:false,
            align:"center"
        },

        {
            name:'id_rol',
            index:'id_rol',
            width:80,
            search:false,
            align:"center",
            formatter:function(value){
                if (value == 1)
                    return "Admin";
                else if (value == 2)
                    return "Cliente";
                else if (value == 3)
                    return 'Super';
            }
        },

        {
            name:'opcion',
            index:'opcion',
            align:"center",
            width:70,
            search:false
        },
        ],
        caption: "Datos de usuario",
        viewrecords: true, 
        sortorder: "asc",
        pager: '#usuarios-grid-page',
        sortname: 'id'
    });
    $("#usuarios-grid").jqGrid('filterToolbar');
    $("#usuarios-grid").jqGrid('navGrid',"#usuarios-grid-page",{
        search:false,
        edit:false,
        add:false,
        del:false,
        refresh:true
    });
   
   
    $("#btn-create-usuario").button().click(function(){
        $.ajax({
            url: urls.siteUrl + "/admin/usuario/nuevo-usuario/ajax/form",
            success: function(form){
                $('div:last').append('<div id="create-usuario" title="Nuevo Usuario">'+form+'</div>');
                $telefono = $("#form-usuario #telefono");
                $telefono.numeric();
                $('#create-usuario').dialog({
                    height: 450,
                    width: 580,
                    modal: true,
                    resizable: false,
                    buttons: {
                        "Crear Usuario": function() {
                            dialog = $(this);
                            // validar formulario
                            $.ajax({
                                type:'post',
                                url: urls.siteUrl + "/admin/usuario/nuevo-usuario/ajax/validar",
                                data: $('#form-usuario').serialize(),
                                success:function(json){
                                    if(validarCampos(json)){
                                        // guardar usuario
                                        $.ajax({
                                            url: urls.siteUrl + '/admin/usuario/nuevo-usuario/ajax/save',
                                            data: $("#form-usuario").serialize(),
                                            success: function(){
                                                $("#create-usuario").remove();
                                                dialog.dialog("close");
                                                $("#usuarios-grid").trigger("reloadGrid");
                                            }
                                        });
                                    }
                                }
                            });
                        },
                        Cancelar: function() {
                            $("#create-usuario").remove();
                            $(this).dialog("close");
                        
                        }
                    },
                    close: function() {
                        $("#create-usuario").remove();
                    }
                });
            }
        });
       
    });

    editarUsuario = function (id_usuario) {

        $.ajax({
            url: urls.siteUrl + "/admin/usuario/modificar-usuario/ajax/form/id/"+id_usuario,
            success: function(form){
                $('div:last').append('<div id="update-usuario" title="Modificar Usuario">'+form+'</div>');
                $('#update-usuario').dialog({
                    height: 450,
                    width: 580,
                    modal: true, 
                    resizable: false,
                    buttons: {
                        "Modificar Usuario": function() {
                            dialog = $(this);
                            // validar formulario
                            $.ajax({
                                type:'post',
                                url: urls.siteUrl + "/admin/usuario/modificar-usuario/ajax/validar",
                                data: $('#form-usuario').serialize(),
                                success:function(json){
                                    if(validarCampos(json)){
                                        // guardar usuario
                                        $.ajax({
                                            url: urls.siteUrl + '/admin/usuario/modificar-usuario/save/1/id/'+id_usuario,
                                            type:'post',
                                            data: $("#form-usuario").serialize(),
                                            success: function(){
                                                $("#update-usuario").remove();
                                                dialog.dialog("close");
                                                $("#usuarios-grid").trigger("reloadGrid");
                                            }
                                        });
                                    }
                                }
                            });
                        },
                        Cancelar: function() {
                            $("#update-usuario").remove();
                            $(this).dialog("close");
                        }
                    },
                    close: function() {
                        $("#update-usuario").remove();
                    }
                });
            }
        });
    }
   
});