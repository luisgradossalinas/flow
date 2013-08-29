<?php

class Application_Form_Categoria extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
        $nom_cat = new Zend_Form_Element_Text('nom_cat');
        $nom_cat->setLabel('Nom_cat:');
        $nom_cat->setRequired();
        $nom_cat->setAttrib('maxlength',50);
        $nom_cat->addFilter('StripTags');
        $this->addElement($nom_cat);
        
        $estado = new Zend_Form_Element_Text('estado');
        $estado->setLabel('Estado:');
        $estado->setRequired();
        $estado->addValidator(new Zend_Validate_Int());
        $estado->setAttrib('maxlength',3);
        $estado->setAttrib('size',5);
        $estado->setAttrib('class','v_numeric');
        $estado->addFilter('StripTags');
        $this->addElement($estado);
        
        $usuario_crea = new Zend_Form_Element_Text('usuario_crea');
        $usuario_crea->setLabel('Usuario_crea:');
        $usuario_crea->addValidator(new Zend_Validate_Int());
        $usuario_crea->setAttrib('maxlength',9);
        $usuario_crea->setAttrib('class','v_numeric');
        $usuario_crea->addFilter('StripTags');
        $this->addElement($usuario_crea);
        
        $fecha_crea = new Zend_Form_Element_Text('fecha_crea');
        $fecha_crea->setLabel('Fecha_crea:');
        $fecha_crea->addValidator(new Zend_Validate_Date('DD-MM-YYYY'));
        $fecha_crea->setAttrib('maxlength',10);
        $fecha_crea->setAttrib('class','v_datepicker');
        $fecha_crea->addFilter('StripTags');
        $this->addElement($fecha_crea);
        
        $usuario_actu = new Zend_Form_Element_Text('usuario_actu');
        $usuario_actu->setLabel('Usuario_actu:');
        $usuario_actu->addValidator(new Zend_Validate_Int());
        $usuario_actu->setAttrib('maxlength',9);
        $usuario_actu->setAttrib('class','v_numeric');
        $usuario_actu->addFilter('StripTags');
        $this->addElement($usuario_actu);
        
        $fecha_actu = new Zend_Form_Element_Text('fecha_actu');
        $fecha_actu->setLabel('Fecha_actu:');
        $fecha_actu->addValidator(new Zend_Validate_Date('DD-MM-YYYY'));
        $fecha_actu->setAttrib('maxlength',10);
        $fecha_actu->setAttrib('class','v_datepicker');
        $fecha_actu->addFilter('StripTags');
        $this->addElement($fecha_actu);
    }

    public function populate($data)
    {
        $data['fecha_crea'] = new Zend_Date($data['fecha_crea'],'yyyy-mm-dd');
        $data['fecha_crea'] = $data['fecha_crea']->get('dd/mm/yyyy');
        $data['fecha_actu'] = new Zend_Date($data['fecha_actu'],'yyyy-mm-dd');
        $data['fecha_actu'] = $data['fecha_actu']->get('dd/mm/yyyy');
        return $this->setDefaults($data);
    }


}

