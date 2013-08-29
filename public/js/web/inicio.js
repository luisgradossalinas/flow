$(document).ready(function(){
    
   
   validaBusqueda = function(){
    $busqueda = $("#search_query").val();
    if ($busqueda != "")
     {
        document.getElementById('searchbox').submit();
        return true;
     }
     else
     {
         alert("Ingrese producto a buscar.");
         $("#search_query").focus();
         return false;
     }
    
    
   }
   
   var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
   
   
   $('#login').click(function(){
       
       $correo = $('#correo_web').val();
       $clave = $('#clave_web').val();
       
       if ($correo == '' || $clave == '')
       {
           $('#msjError').empty().html('Ingrese usuario y clave');
           return;
       }
           
       
       $.ajax({
           url: urls.siteUrl + '/admin/auth/login-web',
           type: 'post',
           dataType: 'json',
           data:{
               correo: $correo,
               clave: $clave
           },
           success : function(result)
           {
               if (result.success == 1)
                    document.location.reload(true);    
               else
                   $('#msjError').empty().html(result.msg);
           }
           
       })
       
   })
  
  
    
    
})
