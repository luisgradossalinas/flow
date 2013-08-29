$(document).ready(function(){
    
    verFoto = function(nombreFoto)
    {
        $("body").append("<div id=imagenProducto></div>");
        $("#imagenProducto").append("<center><img src='"+ urls.siteUrl +"/images/small/"+nombreFoto+"'></center>")
        $("#imagenProducto").dialog({
            width:350,
            height:350,
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

    $("#producto-grid").jqGrid({
        url: urls.siteUrl + "/admin/producto",
        datatype: "json",
        height: 370,
        width: 620,
        gridview: true,
        colNames:['N','Producto','Precio','Categoría','Estado','Imagen'],
        colModel:[
        {
            name:'id', 
            index:'id', 
            width: 5 ,
            align:'center',
            search:false
        },
        {
            name:'nom_prod', 
            index:'nom_prod',
            width:30,
            align: "left",
            search:true
        },
        {
            name:'precio', 
            index:'precio',
            width:7,
            align: "center",
            search:true
        },
        {
            name:'nom_cat', 
            index:'nom_cat', 
            width: 15, 
            align:'center',
            search:false
        },
        {
            name:'estado', 
            index:'estado', 
            width: 10, 
            align:'center',
            search:false,
            formatter: function(value){
                if (value == null)
                    return '...';
                else if(value == 1)
                    return "<img src="+urls.siteUrl+"/images/icons/checkmark.png width=18% title='Activo' alt='Activo'>";
                else if (value == 0)
                    return "<img src="+urls.siteUrl+"/images/icons/error.png width=18% title='Desactivado' alt='Desactivado'>";
                else
                    return '...';
            }
        },

        {
            name:'imagen', 
            index:'imagen', 
            width: 15, 
            align:'center',
            search:false,
            formatter: function(value,options, data){
                return "<a href=javascript:verFoto('" + value + "')><img src="+urls.siteUrl+"/images/small/"+value+" width=30  height=30></a>";
            }
        }
        ],
        caption: "Producto",
        rowNum:10, 
        rowList:[10,20,40,80,100],
        viewrecords: true, 
        sortorder: "asc",
        pager: '#producto-grid-page', 
        sortname: 'id'
    });
    $("#producto-grid").jqGrid('filterToolbar');
 
    $("#producto-grid").jqGrid('navGrid',"#producto-grid-page",{
        search:false,
        edit:false,
        add:false,
        del:false,
        refresh:true
    });

    new AjaxUpload('#btnSubirFoto', {
        name: 'fileFoto',
        action: urls.siteUrl + '/admin/producto/registrofoto/',
        onSubmit : function(file, ext){
            if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext))){
                alert('Error: Solo se permiten imagenes');
                return false;
            }
        },
        onComplete: function(file, response){            
            $('#fileFoto').attr('value', response);
            $('#fotoProducto').attr('src', urls.siteUrl +  '/images/' + response);
        }
    });
    
    $("#btn-create-producto").button().click(function() {
        $('#fileFoto').val("");
        $("#fotoProducto").attr("src", urls.siteUrl + "/images/photoEmpDefault.jpg");
        $.ajax({
            url: urls.siteUrl + "/admin/producto/nuevo-producto/ajax/form",
            success: function(form){
                $('#ventana-producto').prepend(form);
                $precio = $("#precio");
                $precio.numeric();
                $precio.css("width", "60px");
                $("#capa_imagen").show();
                $('#ventana-producto').dialog({
                    height: 390,
                    width: 600, 
                    modal: true,
                    resizable: false,
                    title:'Nuevo producto',
                    buttons: {
                        "Crear producto": function() {
                            dialog = $(this);
                            // validar formulario
                            $.ajax({
                                type:'post',
                                url: urls.siteUrl + "/admin/producto/nuevo-producto/ajax/validar",
                                data: $('#form-producto').serialize(),
                                success:function(json){
                                    if(validarCampos(json)){
                                        // guardar producto
                                        if ($('#fileFoto').val() == "")
                                        {
                                            jAlert("Mensaje del sistema","Selecciona imagen");
                                            return;
                                        }
                                        $.ajax({
                                            url: urls.siteUrl + '/admin/producto/nuevo-producto/ajax/save',
                                            data: $("#form-producto").serialize(),
                                            success: function(){
                                                dialog.dialog("close");
                                                $("#producto-grid").trigger("reloadGrid");
                                            }
                                        });
                                    }
                                }
                            });  
                        },
                        "Cancelar": function() {
                            $(this).dialog("close");
                            $("#form-producto").remove()
                        
                        }
                    },
                    close: function() {
                        $("#form-producto").remove();
                    }
                }); 
            }
        });
                    
    });
    
    $("#btn-update-producto").button().click(function(){
        var id_producto = validarSeleccionLinea("#producto-grid");
        if(!id_producto){
            return false;
        }
        
        $.ajax({
            url: urls.siteUrl + "/admin/producto/modificar-producto/ajax/form/id/"+id_producto,
            success: function(form){
                $('#ventana-producto').prepend(form);
                $precio = $("#precio");
                $precio.numeric();
                $precio.css("width", "60px");
                $("#capa_imagen").hide();
                $('#ventana-producto').dialog({
                    height: 390,
                    width: 600,
                    title: "Modificar producto",
                    modal: true, 
                    resizable: false,
                    buttons: {
                        "Modificar": function() {
                            dialog = $(this);
                            // validar formulario
                            $.ajax({
                                type:'post',
                                url: urls.siteUrl + "/admin/producto/modificar-producto/ajax/validar",
                                data: $('#form-producto').serialize(),
                                success:function(json){
                                    if(validarCampos(json)){
                                        // guardar registro
                                        $.ajax({
                                            url: urls.siteUrl + '/admin/producto/modificar-producto/save/1/id/'+id_producto,
                                            type:'post',
                                            data: $("#form-producto").serialize(),
                                            success: function(){
                                                dialog.dialog("close");
                                                $("#producto-grid").trigger("reloadGrid");
                                                $("#form-producto").remove();
                                                $("#fotoShow").remove();
                                            }
                                        });
                                    }
                                }
                            });
                        },
                        Cancelar: function() {
                            $(this).dialog("close");
                            $("#form-producto").remove();
                            $("#fotoShow").remove();
                        }
                    },
                    close: function() {
                        $("#form-producto").remove();
                        $("#fotoShow").remove();
                    }
                });
            }
        });
    })


    
})
