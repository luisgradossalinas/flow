<?php

class Application_Form_Contacto extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
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
        $this->addElement($correo);
        
        $mensaje = new Zend_Form_Element_Text('mensaje');
        $mensaje->setLabel('Mensaje:');
        $mensaje->setRequired();
        $mensaje->setAttrib('maxlength',500);
        $mensaje->addFilter('StripTags');
        $this->addElement($mensaje);
        
        $fecha_envio = new Zend_Form_Element_Text('fecha_envio');
        $fecha_envio->setLabel('Fecha_envio:');
        $fecha_envio->setRequired();
        $fecha_envio->addValidator(new Zend_Validate_Date('DD-MM-YYYY'));
        $fecha_envio->setAttrib('maxlength',10);
        $fecha_envio->setAttrib('class','v_datepicker');
        $fecha_envio->addFilter('StripTags');
        $this->addElement($fecha_envio);
        
        $respondido = new Zend_Form_Element_Text('respondido');
        $respondido->setLabel('Respondido:');
        $respondido->setRequired();
        $respondido->addValidator(new Zend_Validate_Int());
        $respondido->setAttrib('maxlength',9);
        $respondido->setAttrib('class','v_numeric');
        $respondido->addFilter('StripTags');
        $this->addElement($respondido);
    }

    public function populate($data)
    {
        $data['fecha_envio'] = new Zend_Date($data['fecha_envio'],'yyyy-mm-dd');
        $data['fecha_envio'] = $data['fecha_envio']->get('dd/mm/yyyy');
        return $this->setDefaults($data);
    }


}

