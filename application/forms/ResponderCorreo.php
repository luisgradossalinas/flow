<?php

class Application_Form_ResponderCorreo extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form-contacto');
        
        $nombres = new Zend_Form_Element_Text('nombres');
        $nombres->setLabel('Nombres:');
        $nombres->setRequired();
        $nombres->setAttrib('maxlength',45);
        $nombres->addFilter('StripTags');
        $this->addElement($nombres);
        
        $celular = new Zend_Form_Element_Text('celular');
        $celular->setLabel('Celular:');
        $celular->setRequired();
        $celular->setAttrib('maxlength',20);
        $celular->addFilter('StripTags');
        $this->addElement($celular);
        
        $correo = new Zend_Form_Element_Text('correo');
        $correo->setLabel('Correo:');
        $correo->setRequired();
        $correo->setAttrib('maxlength',45);
        $correo->addFilter('StripTags');
        $correo->addValidator(new Zend_Validate_EmailAddress());
        $this->addElement($correo);
        
        $mensaje = new Zend_Form_Element_Textarea('mensaje');
        $mensaje->setLabel('Mensaje:');
        $mensaje->setRequired();
        $mensaje->setAttrib('cols', 2);
        $mensaje->setAttrib('rows',5);
        $mensaje->setAttrib('maxlength',300);
        $mensaje->addFilter('StripTags');
        $this->addElement($mensaje);
        
        $respuesta = new Zend_Form_Element_Textarea('respuesta');
        $respuesta->setLabel('Respuesta:');
        $respuesta->setRequired();
        $respuesta->setAttrib('cols', 2);
        $respuesta->setAttrib('rows',5);
        $respuesta->setAttrib('maxlength',300);
        $respuesta->addFilter('StripTags');
        $this->addElement($respuesta);

    }


}

