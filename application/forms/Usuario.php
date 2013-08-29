<?php

class Application_Form_Usuario extends Zend_Form
{
    
    private $_model = null;

    public function __construct($model = null){
        $this->_model = $model;
        parent::__construct();
    }

    public function init()
    {
        $auth = Zend_Auth::getInstance();
        $this->setAttrib('id', 'form-usuario');
        
        $nombres = new Zend_Form_Element_Text('nombres');
        $nombres->setLabel('Nombres:');
        $nombres->setRequired();
        $nombres->addValidator(new Zend_Validate_StringLength(array('min' => 3)));

        $apellidos = new Zend_Form_Element_Text('apellidos');
        $apellidos->setLabel('Apellidos:');
        $apellidos->setRequired();
        $apellidos->addValidator(new Zend_Validate_StringLength(array('min' => 3)));
        
        $fechaNacimiento = new Zend_Form_Element_Text('fecha_nac');
        $fechaNacimiento->setLabel('Fecha de Nacimiento');
        
        $email = new Zend_Form_Element_Text('email');
        $email->setLabel('Email:');
        $email->setRequired();
        $email->addValidator(new Zend_Validate_EmailAddress());
        
        $direccion = new Zend_Form_Element_Text('direccion');
        $direccion->setLabel('Dirección:');
        
        $celular = new Zend_Form_Element_Text('celular');
        $celular->setLabel('Celular:');
        $celular->setAttrib('maxlength', 15);
        
        $telefono = new Zend_Form_Element_Text('telefono');
        $telefono->setLabel('Teléfono:');
        $telefono->setAttrib('maxlength', 15);
        
        $contrasenia = new Zend_Form_Element_Password('clave');
        $contrasenia->setLabel('Contraseña:');
        $contrasenia->addValidator(new Zend_Validate_StringLength(array('min' => 6)));

        $contrasenia2 = new Zend_Form_Element_Password('clave2');
        $contrasenia2->setLabel('Confirmar Contraseña:');
        $contrasenia2->addValidator(new Zend_Validate_StringLength(array('min' => 6)));
        
        $bloqueado = new Zend_Form_Element_Select('estado');
        $bloqueado->setLabel('Estado:');
        $bloqueado->setMultiOptions(array('1' => 'Activo', '0' => 'Inactivo'));
        
        
        $rolModelo = new Application_Model_Rol;
        $listaRoles = $rolModelo->lista();
        
        $rol = new Zend_Form_Element_Select("id_rol");
        $rol->setLabel("Rol:");
        $rol->setRequired();
        $rol->addMultiOptions($listaRoles);
        $rol->setValue($this->_model["id_rol"]);
        
        if ($auth->getIdentity()->id_rol == Application_Model_Usuario::OTRO_ROL)
        {
            $email->setAttrib("readonly","true");
            $elements = array(
                $nombres,
                $apellidos,
                $fechaNacimiento,
                $email,
                $direccion,
                $celular,
                $telefono,
                $contrasenia,
                $contrasenia2   
            );
        }
        else
        {
            $elements = array(
                $nombres,
                $apellidos,
                $fechaNacimiento,
                $email,
                $direccion,
                $celular,
                $telefono,
                $contrasenia,
                $contrasenia2,
                $bloqueado,
                $rol
            );  
        }
        
        foreach ($elements as $element) {
            $element->addDecorator(array('div' => 'HtmlTag'), array('tag' => 'div', 'class' => 'line'));
        }
        
        $this->addElements($elements);
        
    }


}

