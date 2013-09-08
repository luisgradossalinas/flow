<?php

class Application_Form_Contacto extends Zend_Form
{

    public function init()
    {
        $this->setMethod('post');
        $this->setAction(SITE_URL.'/contacto');
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
        $mensaje->setAttrib('maxlength',500);
        $mensaje->addFilter('StripTags');
        $this->addElement($mensaje);
        
        $boton = new Zend_Form_Element_Submit('submitAccount');
        $boton->setLabel('Enviar');
        $boton->setAttrib('class', 'exclusive');
        $this->addElement($boton);
    }


}

