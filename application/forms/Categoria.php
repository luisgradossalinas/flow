<?php

class Application_Form_Categoria extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
        $nom_cat = new Zend_Form_Element_Text('nom_cat');
        $nom_cat->setLabel('Nombre:');
        $nom_cat->setRequired();
        $nom_cat->setAttrib('maxlength',50);
        $nom_cat->addFilter('StripTags');
        $this->addElement($nom_cat);
        
        $estado = new Zend_Form_Element_Select('estado');
        $estado->setLabel('Estado:');
        $dataEstado = array();
        array_unshift($dataEstado,array('key'=> '0', 'value' => 'Inactivo'));
        array_unshift($dataEstado,array('key'=> '1', 'value' => 'Activo'));
        array_unshift($dataEstado,array('key'=> '', 'value' => 'Seleccione'));
        $estado->setMultiOptions($dataEstado);
        
    
        $estado->setRequired();
        $estado->addFilter('StripTags');
        $this->addElement($estado);
 
    }


}

