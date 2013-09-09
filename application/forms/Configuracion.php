<?php

class Application_Form_Configuracion extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
        $nombre = new Zend_Form_Element_Text('nombre');
        $nombre->setLabel('Nombre:');
        $nombre->setRequired();
        $nombre->setAttrib('maxlength',45);
        $nombre->addFilter('StripTags');
        $this->addElement($nombre);
        
        $valor = new Zend_Form_Element_Text('valor');
        $valor->setLabel('Valor:');
        $valor->setRequired();
        $valor->setAttrib('maxlength',45);
        $valor->addFilter('StripTags');
        $this->addElement($valor);
    }


}

