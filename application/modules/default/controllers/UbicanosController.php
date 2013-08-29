<?php

class Default_UbicanosController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $this->_helper->viewRenderer->setNoRender();
       echo "hola";
    }

    public function pruebaAction()
    {
      /* $db =  Zend_Db_table::getDefaultAdapter();
       $select = $db->select()->from("producto");
       print_r($db->fetchAll($select));*/
       $producto = new Application_Model_Producto();
       print_r ($producto->listado());
    }


}



