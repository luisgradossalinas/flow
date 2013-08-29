<?php

class Application_Form_Producto extends Zend_Form
{

    public function init()
    {
        $this->setAttrib('id', 'form');
        
        $nom_prod = new Zend_Form_Element_Text('nom_prod');
        $nom_prod->setLabel('Nom_prod:');
        $nom_prod->setRequired();
        $nom_prod->setAttrib('maxlength',100);
        $nom_prod->addFilter('StripTags');
        $this->addElement($nom_prod);
        
        $precio = new Zend_Form_Element_Text('precio');
        $precio->setLabel('Precio:');
        $precio->setRequired();
        $precio->addFilter('StripTags');
        $this->addElement($precio);
        
        $imagen = new Zend_Form_Element_Text('imagen');
        $imagen->setLabel('Imagen:');
        $imagen->setRequired();
        $imagen->setAttrib('maxlength',50);
        $imagen->addFilter('StripTags');
        $this->addElement($imagen);
        
        $estado = new Zend_Form_Element_Text('estado');
        $estado->setLabel('Estado:');
        $estado->setRequired();
        $estado->addValidator(new Zend_Validate_Int());
        $estado->setAttrib('maxlength',9);
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
        
        $id_categoria = new Zend_Form_Element_Text('id_categoria');
        $id_categoria->setLabel('Id_categoria:');
        $id_categoria->setRequired();
        $id_categoria->addValidator(new Zend_Validate_Int());
        $id_categoria->setAttrib('maxlength',9);
        $id_categoria->setAttrib('class','v_numeric');
        $id_categoria->addFilter('StripTags');
        $this->addElement($id_categoria);
        
        $codigo_web = new Zend_Form_Element_Text('codigo_web');
        $codigo_web->setLabel('Codigo_web:');
        $codigo_web->setAttrib('maxlength',50);
        $codigo_web->addFilter('StripTags');
        $this->addElement($codigo_web);
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

