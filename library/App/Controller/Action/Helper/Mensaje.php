<?php

class App_Controller_Action_Helper_Mensaje 
    extends Zend_Controller_Action_Helper_Abstract
{
    private $_mensaje;
    private $_postulacion;
    public function __construct()
    {
    }

    
    public function mensaje($mensaje)
    {
        return $mensaje;
    }
}
