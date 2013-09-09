<?php

class Application_Form_Usuario extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
        $nombres = new Zend_Form_Element_Text('nombres');
        $nombres->setLabel('Nombres:');
        $nombres->setAttrib('maxlength',100);
        $nombres->addFilter('StripTags');
        $this->addElement($nombres);
        
        $apellidos = new Zend_Form_Element_Text('apellidos');
        $apellidos->setLabel('Apellidos:');
        $apellidos->setAttrib('maxlength',100);
        $apellidos->addFilter('StripTags');
        $this->addElement($apellidos);
        
        $email = new Zend_Form_Element_Text('email');
        $email->setLabel('Email:');
        $email->setAttrib('maxlength',45);
        $email->addFilter('StripTags');
        $this->addElement($email);
        
        $clave = new Zend_Form_Element_Text('clave');
        $clave->setLabel('Clave:');
        $clave->setAttrib('maxlength',100);
        $clave->addFilter('StripTags');
        $this->addElement($clave);
        
        $estado = new Zend_Form_Element_Text('estado');
        $estado->setLabel('Estado:');
        $estado->addValidator(new Zend_Validate_Int());
        $estado->setAttrib('maxlength',3);
        $estado->setAttrib('size',5);
        $estado->setAttrib('class','v_numeric');
        $estado->addFilter('StripTags');
        $this->addElement($estado);
        
        $telefono = new Zend_Form_Element_Text('telefono');
        $telefono->setLabel('Telefono:');
        $telefono->setAttrib('maxlength',15);
        $telefono->addFilter('StripTags');
        $this->addElement($telefono);
        
        $celular = new Zend_Form_Element_Text('celular');
        $celular->setLabel('Celular:');
        $celular->setAttrib('maxlength',15);
        $celular->addFilter('StripTags');
        $this->addElement($celular);
        
        $direccion = new Zend_Form_Element_Text('direccion');
        $direccion->setLabel('Direccion:');
        $direccion->setAttrib('maxlength',100);
        $direccion->addFilter('StripTags');
        $this->addElement($direccion);
        
        $id_rol = new Zend_Form_Element_Text('id_rol');
        $id_rol->setLabel('Id_rol:');
        $id_rol->setRequired();
        $id_rol->addValidator(new Zend_Validate_Int());
        $id_rol->setAttrib('maxlength',9);
        $id_rol->setAttrib('class','v_numeric');
        $id_rol->addFilter('StripTags');
        $this->addElement($id_rol);
        
        $fecha_nac = new Zend_Form_Element_Text('fecha_nac');
        $fecha_nac->setLabel('Fecha_nac:');
        $fecha_nac->setRequired();
        $fecha_nac->addValidator(new Zend_Validate_Date('DD-MM-YYYY'));
        $fecha_nac->setAttrib('maxlength',10);
        $fecha_nac->setAttrib('class','v_datepicker');
        $fecha_nac->addFilter('StripTags');
        $this->addElement($fecha_nac);
     
    }

}

