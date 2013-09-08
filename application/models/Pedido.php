<?php

class Application_Model_Pedido extends Zend_Db_Table
{

    protected $_name = 'pedido';

    protected $_primary = 'id';

    const ESTADO_INACTIVO = 0;

    const ESTADO_ACTIVO = 1;

    const ESTADO_ELIMINADO = 2;

    const TABLA = 'pedido';

    public function guardar($datos)
    {
        $id = 0;
        if (!empty($datos["id"])) {
        	$id = (int) $datos["id"];
        }
        
        unset($datos["id"]);
        $datos = array_intersect_key($datos, array_flip($this->_getCols()));
        
        if ($id > 0) {
        	$datos['fecha_genera'] = new Zend_Date($datos['fecha_genera'],'yyyy-mm-dd');
        	$datos['fecha_genera'] = $datos['fecha_genera']->get('yyyy-mm-dd');
        	$datos['fecha_entrega'] = new Zend_Date($datos['fecha_entrega'],'yyyy-mm-dd');
        	$datos['fecha_entrega'] = $datos['fecha_entrega']->get('yyyy-mm-dd');
        	$cantidad = $this->update($datos, 'id = ' . $id);
        	$id = ($cantidad < 1) ? 0 : $id;
        } else {
        	$datos['fecha_genera'] = new Zend_Date($datos['fecha_genera'],'yyyy-mm-dd');
        	$datos['fecha_genera'] = $datos['fecha_genera']->get('yyyy-mm-dd');
        	$datos['fecha_entrega'] = new Zend_Date($datos['fecha_entrega'],'yyyy-mm-dd');
        	$datos['fecha_entrega'] = $datos['fecha_entrega']->get('yyyy-mm-dd');
        	$id = $this->insert($datos);
        }
        
        return $id;
    }

    public function listado()
    {
        return $this->getAdapter()->select()->from($this->_name)->query()->fetchAll();
    }


}

