<?php


class Application_Model_Carrito extends Zend_Db_Table
{

    protected $_name = 'carrito';
    
    const TABLA = "carrito";
    
    public function listado()
    {
        return $this->select()->from($this->_name,$this->_cols)->query()->fetchAll();
    }
        
    public function guardar($datos)
    {         
        $id = 0;
        if (!empty($datos['id'])) {
            $id = (int) $datos['id'];
        }
        unset($datos['id']);

        $datos = array_intersect_key($datos, array_flip($this->_getCols()));

        foreach ($datos as $key => $valor) {
            if (!is_numeric($valor)) {
                $datos[$key] = str_replace("'", '"', $valor);
            }
        }

        if ($id > 0) {
            $cantidad = $this->update($datos, 'id = ' . $id);
            $id = ($cantidad < 1) ? 0 : $id;
        } else {
            $id = $this->insert($datos);
        }
        return $id;
    }
    
    

}

