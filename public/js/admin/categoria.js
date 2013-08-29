$(document).ready(function(){
    
$("#categoria-grid").jqGrid({
        url: urls.siteUrl + "/admin/categoria",
        datatype: "json",
        width:620,
        height:345,
        gridview: true,
        colNames:['N','Categoría','Estado'],
        colModel:[
        {name:'id', index:'id',width:20 ,align:'center',search:false},
        {name:'nom_cat', index:'nom_cat',width:100,align: "left",search:true},
        {name:'estado', index:'estado',width:30,align:'center',search:false,
        formatter : function(value){
               if (value == null)
                   return '';
               else if(value == 1)
                   return "<img src="+ urls.siteUrl +"/images/icons/checkmark.png width=12% title='Activado'  alt='Activado'>";
               else if (value == 0)
                   return "<img src="+ urls.siteUrl +"/images/icons/error.png width=12% title='Desactivado' alt='Desactivado'>";
               else
                   return '';
            }}
        ],
        caption: "Categoría",
        viewrecords: true, 
        rowNum:20, 
        rowList:[20,40,100],
        sortorder: "asc",
        pager: '#categoria-grid-page', 
        sortname: 'id'
    });
 $("#categoria-grid").jqGrid('filterToolbar');
 
$("#categoria-grid").jqGrid('navGrid',"#categoria-grid-page",{
    search:false,
    edit:false,
    add:false,
    del:false,
    refresh:true
});

$("#btn-create-categoria").button().click(function() {
      $.ajax({
        url: urls.siteUrl + "/admin/categoria/nueva-categoria/ajax/form",
        success: function(form){
            $('body').append("<div id='ventana-categoria'>" + form + "</div>");
            $('#ventana-categoria').dialog({
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
                            url: urls.siteUrl + "/admin/categoria/nueva-categoria/ajax/validar",
                            data: $('#form-categoria').serialize(),
                            success:function(json){
                                if(validarCampos(json)){
                                    // guardar recurso
                                    $.ajax({
                                        url: urls.siteUrl + '/admin/categoria/nueva-categoria/ajax/save',
                                        data: $("#form-categoria").serialize(),
                                        success: function(){
                                            dialog.dialog("close");
                                            $("#categoria-grid").trigger("reloadGrid");
                                            $('#ventana-categoria').remove();
                                        }
                                    });
                                }
                            }
                        });
                    },
                    Cancelar: function() {
                        $(this).dialog("close"); 
                        $('#ventana-categoria').remove();
                    }
                },
                close: function() {$("#ventana-categoria").remove();}
            });
        }
    });   
  });
  
   $("#btn-update-categoria").button().click(function(){
      var id_categoria = validarSeleccionLinea("#categoria-grid");
        if(!id_categoria){
             return false;
        }
    
      $.ajax({
        url: urls.siteUrl + "/admin/categoria/modificar-categoria/ajax/form/id/"+id_categoria,
        success: function(form){
            $('body').append("<div id='ventana-categoria'>" + form + "</div>");
            $('#ventana-categoria').dialog({
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
                            url: urls.siteUrl + "/admin/categoria/modificar-categoria/ajax/validar",
                            data: $('#form-categoria').serialize(),
                            success:function(json){
                                if(validarCampos(json)){
                                    // guardar registro
                                    $.ajax({
                                        url: urls.siteUrl + '/admin/categoria/modificar-categoria/save/1/id/'+id_categoria,
                                        type:'post',
                                        data: $("#form-categoria").serialize(),
                                        success: function(){
                                            dialog.dialog("close");
                                            $("#categoria-grid").trigger("reloadGrid");
                                            $('#ventana-categoria').remove();
                                        }
                                    });
                                }
                            }
                        });
                    },
                    Cancelar: function() {
                        $(this).dialog("close");
                        $('#ventana-categoria').remove();
                    }
                },
                close: function() {$("#ventana-categoria").remove();}
            });
        }
    });
  })


})
