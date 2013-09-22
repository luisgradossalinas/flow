<?php

class Application_Form_Login extends Zend_Form
{

    public function init() {
        
        $this->setMethod(Zend_Form::METHOD_POST);
        $this->setAction(SITE_URL.'/cliente/login');
        $this->setAttrib('id', 'form-login');

        $email = new Zend_Form_Element_Text('correo');
        $email->setLabel('Email:');
        $email->setRequired(true)->setAttrib('maxlength', 40);
        $email->addFilter('StripTags');
        $email->addValidator(new Zend_Validate_EmailAddress());
        $this->addElement($email);

        $pass = new Zend_Form_Element_Password('clave');
        $pass->setLabel('Clave');
        $pass->setRequired();
        $this->addElement($pass);

//        $btn = new Zend_Form_Element_Submit('Ingresar');
//        $this->addElement($btn);
        
        $boton = new Zend_Form_Element_Submit('submitAccount');
        $boton->setLabel('Ingresar');
        $boton->setAttrib('class', 'exclusive');
        $this->addElement($boton);

    }


}

