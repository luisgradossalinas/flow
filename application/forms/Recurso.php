<?php

class Application_Form_Recurso extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
        $nombre = new Zend_Form_Element_Text('nombre');
        $nombre->setLabel('Nombre:');
        $nombre->setRequired();
        $nombre->setAttrib('maxlength',40);
        $nombre->addFilter('StripTags');
        $this->addElement($nombre);
        
        $access = new Zend_Form_Element_Text('access');
        $access->setLabel('Access:');
        $access->setRequired();
        $access->setAttrib('maxlength',50);
        $access->addFilter('StripTags');
        $this->addElement($access);
        
        $dataEstado = array();
        array_unshift($dataEstado,array('key'=> '0', 'value' => 'Inactivo'));
        array_unshift($dataEstado,array('key'=> '1', 'value' => 'Activo'));
        array_unshift($dataEstado,array('key'=> '', 'value' => 'Seleccione'));
        
        $estado = new Zend_Form_Element_Select('estado');
        $estado->setLabel('Estado:');
        $estado->setRequired();
        $estado->setMultiOptions($dataEstado);
        $estado->addFilter('StripTags');
        $this->addElement($estado);
        
        $accion = new Zend_Form_Element_Text('accion');
        $accion->setLabel('Accion:');
        $accion->setAttrib('maxlength',50);
        $accion->addFilter('StripTags');
        $this->addElement($accion);
        
        $padre = new Zend_Form_Element_Text('padre');
        $padre->setLabel('Padre:');
        $padre->setRequired();
        $padre->addValidator(new Zend_Validate_Int());
        $padre->setAttrib('maxlength',3);
        $padre->setAttrib('size',5);
        $padre->setAttrib('class','v_numeric');
        $padre->addFilter('StripTags');
        $this->addElement($padre);
        
        $orden = new Zend_Form_Element_Text('orden');
        $orden->setLabel('Orden:');
        $orden->setRequired();
        $orden->addValidator(new Zend_Validate_Int());
        $orden->setAttrib('maxlength',3);
        $orden->setAttrib('size',5);
        $orden->setAttrib('class','v_numeric');
        $orden->addFilter('StripTags');
        $this->addElement($orden);
        
        $url = new Zend_Form_Element_Text('url');
        $url->setLabel('Url:');
        $url->setAttrib('maxlength',100);
        $url->addFilter('StripTags');
        $this->addElement($url);
        
        $funcion_listado = new Zend_Form_Element_Select('funcion_listado');
        $funcion_listado->setLabel('Funcion_listado:');
        $funcion_listado->setAttrib('maxlength',100);
        $funcion_listado->addFilter('StripTags');
        
        $dataFN = array();
        
        array_unshift($dataFN,array('key'=> 'fetchAll', 'value' => 'fetchAll'));
        array_unshift($dataFN,array('key'=> 'listado', 'value' => 'listado'));
        array_unshift($dataFN,array('key'=> '', 'value' => 'Seleccione'));
        
        $funcion_listado->setMultiOptions($dataFN);
        $this->addElement($funcion_listado);
        
        $tab = new Zend_Form_Element_Text('tab');
        $tab->setLabel('Tab:');
        $tab->setAttrib('maxlength',100);
        $tab->addFilter('StripTags');
        $this->addElement($tab);
        
    }

}

