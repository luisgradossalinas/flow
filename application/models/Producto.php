<?php

class Application_Model_Producto extends Zend_Db_Table
{

    protected $_name = 'producto';

    protected $_primary = 'id';

    const ESTADO_INACTIVO = 0;

    const ESTADO_ACTIVO = 1;

    const ESTADO_ELIMINADO = 2;

    const TABLA = 'producto';

    public function guardar($datos)
    {
        $id = 0;
        if (!empty($datos["id"])) {
        	$id = (int) $datos["id"];
        }
        
        unset($datos["id"]);
        $datos = array_intersect_key($datos, array_flip($this->_getCols()));
        
        if ($id > 0) {
        	$cantidad = $this->update($datos, 'id = ' . $id);
        	$id = ($cantidad < 1) ? 0 : $id;
        } else {
        	$id = $this->insert($datos);
        }
        
        return $id;
    }

    public function listado()
    {
        $sql = $this->getAdapter();
        return $sql->select()->from(array('p' => $this->_name))
                ->joinInner(array('c' => 'categoria'), 'c.id = p.id_categoria','nom_cat')
                ->query()->fetchAll();
    }
    
    public function searchByCategoria($cat) 
    {
        $sql = $this->getAdapter();
        return $sql->select()->from($this->_name)->where('id_categoria = ?',$cat)->query()->fetchAll();
    }


}

