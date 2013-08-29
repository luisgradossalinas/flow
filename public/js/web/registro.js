$(document).ready(function(){

   
   //Validación form de registro
   $("#form-registro-usuario #celular").numeric({"negative":false,"decimal":false});
   $("#form-registro-usuario #telefono").numeric({"negative":false,"decimal":false});
   $("#form-registro-usuario #fecha_nac").mask("99/99/9999");

    
})
