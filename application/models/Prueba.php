<?php

class Application_Model_Prueba extends Zend_Db_Table
{

    protected $_name = 'prueba';

    protected $_primary = 'id';

    const ESTADO_INACTIVO = 0;

    const ESTADO_ACTIVO = 1;

    const ESTADO_ELIMINADO = 2;

    const TABLA = 'prueba';

    public function guardar($datos)
    {
        $id = 0;
        if (!empty($datos["id"])) {
        	$id = (int) $datos["id"];
        }
        
        unset($datos["id"]);
        $datos = array_intersect_key($datos, array_flip($this->_getCols()));
        
        $fechaBD = new App_Db_Table_FechaBD;
        if ($datos['fecha1'] != '')
        	$datos['fecha1'] = $fechaBD->FechaBD($datos['fecha1']);
        
        if ($datos['fecha2'] != '')
        	$datos['fecha2'] = $fechaBD->FechaBD($datos['fecha2']);
        
        if ($id > 0) {
        	$cantidad = $this->update($datos, 'id = ' . $id);
        	$id = ($cantidad < 1) ? 0 : $id;
        } else {
        	$GM = new Generator_Modelo();
        	$datos['id'] = $GM->maxCodigo($this->_name);
        	$id = $this->insert($datos);
        }
        
        return $id;
    }

    public function listado()
    {
        return $this->getAdapter()->select()->from($this->_name)->query()->fetchAll();
    }


}

