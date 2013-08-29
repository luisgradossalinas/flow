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
        
        $estado = new Zend_Form_Element_Text('estado');
        $estado->setLabel('Estado:');
        $estado->setRequired();
        $estado->addValidator(new Zend_Validate_Int());
        $estado->setAttrib('maxlength',3);
        $estado->setAttrib('size',5);
        $estado->setAttrib('class','v_numeric');
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
        
        $funcion_listado = new Zend_Form_Element_Text('funcion_listado');
        $funcion_listado->setLabel('Funcion_listado:');
        $funcion_listado->setAttrib('maxlength',100);
        $funcion_listado->addFilter('StripTags');
        $this->addElement($funcion_listado);
        
        $tab = new Zend_Form_Element_Text('tab');
        $tab->setLabel('Tab:');
        $tab->setAttrib('maxlength',100);
        $tab->addFilter('StripTags');
        $this->addElement($tab);
        
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

