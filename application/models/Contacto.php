<?php

class Application_Model_Contacto extends Zend_Db_Table
{

    protected $_name = 'contacto';

    protected $_primary = 'id';

    const ESTADO_INACTIVO = 0;

    const ESTADO_ACTIVO = 1;

    const ESTADO_ELIMINADO = 2;

    const TABLA = 'contacto';

    public function guardar($datos)
    {
        $id = 0;
        if (!empty($datos["id"])) {
        	$id = (int) $datos["id"];
        }
        
        unset($datos["id"]);
        $datos = array_intersect_key($datos, array_flip($this->_getCols()));
        
        if ($id > 0) {
        	$datos['fecha_envio'] = new Zend_Date($datos['fecha_envio'],'yyyy-mm-dd');
        	$datos['fecha_envio'] = $datos['fecha_envio']->get('yyyy-mm-dd');
        	$cantidad = $this->update($datos, 'id = ' . $id);
        	$id = ($cantidad < 1) ? 0 : $id;
        } else {
        	$datos['fecha_envio'] = new Zend_Date($datos['fecha_envio'],'yyyy-mm-dd');
        	$datos['fecha_envio'] = $datos['fecha_envio']->get('yyyy-mm-dd');
        	$id = $this->insert($datos);
        }
        
        return $id;
    }

    public function listado()
    {
        return $this->getAdapter()->select()->from($this->_name)->query()->fetchAll();
    }


}

