<?php

class Application_Form_Producto extends Zend_Form
{
    private $_categoria = null;
    
    public function init()
    {
        $this->_categoria = new Application_Model_Categoria;
        $this->setAttrib('id', 'form');
        
        $nom_prod = new Zend_Form_Element_Text('nom_prod');
        $nom_prod->setLabel('Nombre:');
        $nom_prod->setRequired();
        $nom_prod->setAttrib('maxlength',100);
        $nom_prod->addFilter('StripTags');
        $this->addElement($nom_prod);
        
        $precio = new Zend_Form_Element_Text('precio');
        $precio->setLabel('Precio:');
        $precio->setRequired();
        $precio->setAttrib('class','v_numeric');
        $precio->addFilter('StripTags');
        $this->addElement($precio);
        
        $imagen = new Zend_Form_Element_Text('imagen');
        $imagen->setLabel('Imagen:');
        $imagen->setRequired();
        $imagen->setAttrib('maxlength',50);
        $imagen->addFilter('StripTags');
        $this->addElement($imagen);
        
        $estado = new Zend_Form_Element_Select('estado');
        $estado->setLabel('Estado:');
        $estado->setRequired();

        $dataFN = array();
        
        array_unshift($dataFN,array('key'=> '0', 'value' => 'Inactivo'));
        array_unshift($dataFN,array('key'=> '1', 'value' => 'Activo'));
        array_unshift($dataFN,array('key'=> '', 'value' => 'Seleccione'));
        
        $estado->setMultiOptions($dataFN);
        
        $estado->addFilter('StripTags');
        $this->addElement($estado);
        
        $id_categoria = new Zend_Form_Element_Select('id_categoria');
        $id_categoria->setLabel('Categoría:');
        $id_categoria->setRequired();
        
        $arrayCategoria = $this->_categoria->listadoCombo();
        array_unshift($arrayCategoria,array('key'=> '', 'value' => 'Seleccione'));
        
        $id_categoria->addMultiOptions($arrayCategoria);
        
        $id_categoria->addFilter('StripTags');
        $this->addElement($id_categoria);
        
        $codigo_web = new Zend_Form_Element_Text('codigo_web');
        $codigo_web->setLabel('Codigo_web:');
        $codigo_web->setAttrib('maxlength',50);
        $codigo_web->addFilter('StripTags');
        $this->addElement($codigo_web);
    }



}

