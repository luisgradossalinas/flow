<?php

class Application_Form_Login extends Zend_Form
{

    public function init() {
        $user = new Zend_Form_Element_Text('email');
        $user->setLabel('Usuario');

        $pass = new Zend_Form_Element_Password('password');
        $pass->setLabel('Contraseña');

        $btn = new Zend_Form_Element_Submit('Ingresar');

        $this->addElements(array($user, $pass, $btn));
        $this->setMethod(Zend_Form::METHOD_POST);
    }


}

