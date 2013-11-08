<?php

class Admin_LogicaController extends App_Controller_Action_Admin
{
    
    private $_formResponder;
    private $_contacto;
    
    public function init()
    {
        
        parent::init();
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
        $this->_formResponder = new Application_Form_ResponderCorreo;
        $this->_contacto = new Application_Model_Contacto;
        
    }
    
    public function indexAction()
    {
        
    }
    
    public function contactoCorreoAction()
    {
        $id = $this->_getParam('id');
        $data = $this->_contacto->fetchRow("id = ".$id);
        $this->_formResponder->populate($data->toArray());
        
        echo $this->_formResponder;
        
    }
    
    public function enviarCorreoContactoAction() 
    {
        echo "hola";
    }
    

}



