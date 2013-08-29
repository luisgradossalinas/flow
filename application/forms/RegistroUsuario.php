<?php


class Application_Form_RegistroUsuario extends Zend_Form
{

    public function init()
    {
        $this->setMethod('post');
        $this->setAction(SITE_URL.'/registro');
        $this->setAttrib('id', 'form-registro-usuario');
        
        $nombre = new Zend_Form_Element_Text('nombres');
        $nombre->setLabel('Nombres:');
        $nombre->setRequired(true)->setAttrib('maxlength', 25);
        $nombre->addFilter('StripTags');
        
        $apellidos = new Zend_Form_Element_Text('apellidos');
        $apellidos->setLabel('Apellidos:');
        $apellidos->setRequired(true)->setAttrib('maxlength', 25);
        $apellidos->addFilter('StripTags');
        
        $email = new Zend_Form_Element_Text('email');
        $email->setLabel('Email:');
        $email->setRequired(true)->setAttrib('maxlength', 40);
        $email->addFilter('StripTags');
        $email->addValidator(new Zend_Validate_EmailAddress());
        
        $clave = new Zend_Form_Element_Password('clave');
        $clave->setLabel('Contraseña:');
        $clave->setRequired();
        $clave->addValidator(new Zend_Validate_StringLength(array('min' => 6, 'max' => 20)));
        $clave->addFilter('StripTags');
        
        $fechaNac = new Zend_Form_Element_Text('fecha_nac');
        $fechaNac->setLabel('Fecha nacimiento:');
        $fechaNac->setRequired();
        $fechaNac->addValidator('date', 'dd-mm-YYYY')->addErrorMessage('¡Ingrese fecha correcta! dd/mm/yyyy');
        
        $celular = new Zend_Form_Element_Text('celular');
        $celular->setLabel('Celular:')->setAttrib('maxlength', 15)->setRequired();
        //$celular->addValidator(new Zend_Validate_Int());
        
        $fono = new Zend_Form_Element_Text('telefono');
        $fono->setLabel('Teléfono:')->setAttrib('maxlength', 15);
        //$fono->addValidator(new Zend_Validate_Int());
        
        $direccion = new Zend_Form_Element_Text('direccion');
        $direccion->setRequired()->setLabel('Dirección:')->setAttrib('maxlength', 35);
        $direccion->addFilter('StripTags');
        
        $boton = new Zend_Form_Element_Submit('submitAccount');
        $boton->setLabel('Regístrese');
        $boton->setAttrib('class', 'exclusive');
        
        //$hash = new Zend_Form_Element_Hash('auth_token', 'no_csrf_foo', array('salt' => 'unique'));
        
        /*$captcha = new Zend_Form_Element_Captcha('foo', array(
        'label' => "Please verify you're a human",
        'captcha' => array(
        'captcha' => 'Figlet',
        'wordLen' => 6,
        'timeout' => 300,
        ),
        ));*/
        
        $elements = array($nombre,$apellidos,$email,$clave,$fechaNac,$celular,$fono,$direccion,$boton);  
        
        foreach ($elements as $element) {
            $element->addDecorator(array('div' => 'HtmlTag'), array('tag' => 'div', 'class' => 'line'));
        }
        
        $this->addElements($elements);
        
    }


}

