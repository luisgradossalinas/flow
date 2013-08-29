$(document).ready(function(){
    
    $("#recurso-grid").jqGrid({
            url: urls.siteUrl + "/admin/recurso",
            datatype: "json",
            colNames:['N°', 'Nombre', 'Descripción','Acción','Padre','Orden','Url','Tab','Estado'],
            height: 325,
            width: 1250,
            colModel:[
                {name:'id_recurso',index:'id_recurso', width: 25,align:"center",search:false,hidden:true},
                {name:'nombre',index:'nombre',width:120},
                {name:'descripcion',index:'descripcion',width:100,search:false,
                formatter:function(value)
                {
                    return "<span style='color:#1DA19B'>"+value+"</span>";
                }
                },
            {name:'accion',index:'accion', width: 120,search:false},
            {name:'padre',index:'padre', width: 30,align:"center",search:false},
            {name:'orden',index:'orden', width: 30,align:"center",search:false},
            {name:'url',index:'url', width: 170},
            {name:'tab',index:'tab', width: 120},
            {name:'estado',index:'estado',align:'center',width:40,search:false,
                formatter : function(value){
               if (value == null)
                   return '';
               else if(value == 1)
                   return "<img src="+ urls.siteUrl +"/images/icons/checkmark.png width=20% title='Activado'  alt='Activado'>";
               else if (value == 0)
                   return "<img src="+ urls.siteUrl +"/images/icons/error.png width=20% title='Desactivado' alt='Desactivado'>";
               else
                   return '';
            }}
            ],
            caption: "Recursos",
            viewrecords: true, 
            rowNum:20, 
            //multiselect: true,
            rowList:[20,40,80,100],
            sortorder: "asc",
            pager: '#recurso-grid-page',
            grouping:true, groupingView : {groupField : ['padre'],
            groupColumnShow : [true], 
            groupText : ['<b>Recurso N° {0}</b>']},
            sortname: 'id'
        });
   $("#recurso-grid").jqGrid('filterToolbar');
   $("#recurso-grid").jqGrid('navGrid',"#recurso-grid-page",{search:false,edit:false,add:false,del:false,refresh:true});
    
  $("#btn-create-recurso").button().click(function(){
      $.ajax({
        url: urls.siteUrl + "/admin/recurso/nuevo-recurso/ajax/form",
        success: function(form){
            $('body').append("<div id='ventana-recurso'>" + form + "</div>");
            $('#ventana-recurso').dialog({
                height: 350,
                width: 580,
                title: "Nuevo recurso",
                modal: true,
                resizable: false,
                buttons: {
                    "Crear recurso": function() {
                        dialog = $(this);
                        // validar formulario
                        $.ajax({
                            type:'post',
                            url: urls.siteUrl + "/admin/recurso/nuevo-recurso/ajax/validar",
                            data: $('#form-recurso').serialize(),
                            success:function(json){
                                if(validarCampos(json)){
                                    // guardar recurso
                                    $.ajax({
                                        url: urls.siteUrl + '/admin/recurso/nuevo-recurso/ajax/save',
                                        data: $("#form-recurso").serialize(),
                                        success: function(){
                                            dialog.dialog("close");
                                            $("#recurso-grid").trigger("reloadGrid");
                                            $('#ventana-recurso').remove();
                                        }
                                    });
                                }
                            }
                        });
                    },
                    Cancelar: function() {
                        $(this).dialog("close"); 
                        $('#ventana-recurso').remove();
                    }
                },
                close: function() {$("#ventana-recurso").remove();}
            });
        }
    });
      
      
  });
  
  $("#btn-update-recurso").button().click(function(){
      var id_recurso = validarSeleccionLinea("#recurso-grid");
        if(!id_recurso){
             return false;
        }
    
      $.ajax({
        url: urls.siteUrl + "/admin/recurso/modificar-recurso/ajax/form/id/"+id_recurso,
        success: function(form){
            $('body').append("<div id='ventana-recurso'>" + form + "</div>");
            $('#ventana-recurso').dialog({
                height: 350,
                width: 580,
                title: "Modificar recurso",
                modal: true, 
                resizable: false,
                buttons: {
                    "Modificar recurso": function() {
                        dialog = $(this);
                        // validar formulario
                        $.ajax({
                            type:'post',
                            url: urls.siteUrl + "/admin/recurso/modificar-recurso/ajax/validar",
                            data: $('#form-recurso').serialize(),
                            success:function(json){
                                if(validarCampos(json)){
                                    // guardar registro
                                    $.ajax({
                                        url: urls.siteUrl + '/admin/recurso/modificar-recurso/save/1/id/'+id_recurso,
                                        type:'post',
                                        data: $("#form-recurso").serialize(),
                                        success: function(){
                                            dialog.dialog("close");
                                            $("#recurso-grid").trigger("reloadGrid");
                                            $('#ventana-recurso').remove();
                                        }
                                    });
                                }
                            }
                        });
                    },
                    Cancelar: function() {
                        $(this).dialog("close");
                        $('#ventana-recurso').remove();
                    }
                },
                close: function() {$("#ventana-recurso").remove();}
            });
        }
    });
  })
  
})

