<?php

class Application_Form_Prueba extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
        $fecha1 = new Zend_Form_Element_Text('fecha1');
        $fecha1->setLabel('Fecha1:');
        $fecha1->addValidator(new Zend_Validate_Date('DD-MM-YYYY'));
        $fecha1->setAttrib('maxlength',10);
        $fecha1->setAttrib('class','v_datepicker');
        $fecha1->addFilter('StripTags');
        $this->addElement($fecha1);
        
        $fecha2 = new Zend_Form_Element_Text('fecha2');
        $fecha2->setLabel('Fecha2:');
        $fecha2->addValidator(new Zend_Validate_Date('DD-MM-YYYY'));
        $fecha2->setAttrib('maxlength',10);
        $fecha2->setAttrib('class','v_datepicker');
        $fecha2->addFilter('StripTags');
        $this->addElement($fecha2);
        
        $sueldo = new Zend_Form_Element_Text('sueldo');
        $sueldo->setLabel('Sueldo:');
        $sueldo->addFilter('StripTags');
        $this->addElement($sueldo);
    }

    public function populate(array $data)
    {
        $claseFechaMostrar = new App_View_Helper_FechaMostrar;
        $data['fecha1'] = $claseFechaMostrar->FechaMostrar($data['fecha1']);
        $data['fecha2'] = $claseFechaMostrar->FechaMostrar($data['fecha2']);
        return $this->setDefaults($data);
    }


}

