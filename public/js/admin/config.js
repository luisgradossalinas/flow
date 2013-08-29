function validarCampos(json){
    
    $("ul.error").remove();
    if(json == 'true'){
        return true;
    }
    $.each($.parseJSON(json), function(key,obj) {
        var errores = '';
        $.each(obj, function(error, mensaje){
            errores+= '<li class="'+error+'">'+mensaje+'</li>';
        });
        $('#'+key).after('<ul class="error">'+errores+'</ul>');
    });
    return false;
}

function validarSeleccionLinea(grid){
    var id = $(grid).jqGrid('getGridParam','selrow');
    if(id != null){
        return id;
    }else{
        titulo = 'Mensaje del sistema';
        texto = '<br><br>Seleccione un registro y vuelva a intentarlo.';
        $("body").append('<div align="center" id="dialog-linea-no-seleccionada" title="'+titulo+'">'+texto+'</div>');
        $("#dialog-linea-no-seleccionada").dialog({
            modal: true,
            width: 350,
            height : 170,
            resizable:false,
            close: function(ev, ui)
            {   
                  $(this).remove();

            },
            buttons: {
                Aceptar: function() {
                    $(this).dialog("close");
                    $("#dialog-linea-no-seleccionada").remove();
                }
            }
        });
    }
    return false;
}

function jAlert(titulo,texto)
{
        $("body").append('<div align="center" id="jAlert" title="'+titulo+'"><br><br>'+texto+'</div>');
        $("#jAlert").dialog({
            modal: true,
            width: 350,
            height : 170,
            resizable:false,
            close: function(ev, ui)
            {   
                  $(this).remove();

            },
            buttons: {
                Aceptar: function() {
                    $(this).dialog("close");
                    $("#jAlert").remove();
                }
            }
        });
    
 
}



$(document).ready(function(){
    //Valores configuración
    //Si en media hora no se hace ninguna acción
    segundos = 1200; //20 minutos se cierra
    tiempo = parseInt(segundos) * 1000;
     /*   setInterval(function() {
          $("#mensaje_session").remove();
          $.ajax({
          url : urls.siteUrl + "/admin/auth/valida",
          dataType: "json",
          success: function(result)
          {
            if (result.VALOR == 0)
            {
            titulo = 'Mensaje del sistema';
            texto = '<br><br>Ingrese nuevamente al sistema..';
            $("body").append('<div align="center" id="mensaje_session" title="'+titulo+'">'+texto+'</div>');
            $("#mensaje_session").dialog({
            modal: true,
            width: 420,
            height : 170,
            resizable:false,
            buttons: {
                    Aceptar: function() {
                    $(this).dialog("close");
                    $("#mensaje_session").remove();
                    window.location.href = "/admin/auth/logout";
                        }
                    }})
            }
          }
   
          })          
          
    }, tiempo);*/
    
    	var tab_counter = 2;
        var contador_tabs = 1; //Para saber cuantos tabs existen
        var tab_content = "";
        
		var $tabs = $( "#tabs").tabs({
			tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
			add: function( event, ui ) {
				$( ui.panel ).append(tab_content);
			}
		});
        
        //Función  que agrega tab (id,titulo,modulo/controlador/accion)
        agregarTab = function(id,titulo,enlace)
        {
            if ($("#tabs-" + id).length) {
              return;
            }
            if (contador_tabs > 10)
             {
              alert("Solo se permite 10 tabs");
              return;
            }
            
            
            
         $.ajax({
           url : urls.siteUrl + "/"+enlace,
           success: function(result)
             {
              tab_content = result;
              $tabs.tabs( "add", "#tabs-" + id, titulo );
              $("#tabs-" + id).css({"overflow":"auto","padding":"3px","height":"520px"});
              tab_counter++;
              contador_tabs++;          
             }    
            })
            
           //$(this).hide();
        }

		//Elimina tabs
		$( "#tabs span.ui-icon-close" ).live( "click", function() {
			var index = $( "li", $tabs ).index( $( this ).parent() );
			$tabs.tabs( "remove", index );
            contador_tabs--;
		});
            
})

