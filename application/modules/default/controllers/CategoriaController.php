<?php

class Default_CategoriaController extends Zend_Controller_Action
{

    private $_categoriaModelo;
    
    const ERROR_CATEGORIA = "No existe categoría.";
    
    public function init()
    {
       $this->_categoriaModelo = new Application_Model_Categoria;
       Zend_Layout::getMvcInstance()->assign(array("categoria" => $this->_categoriaModelo->listado()));
    }

    public function indexAction()
    {
        $this->_redirect("categoria/ver/id/1");
    }
    
    public function verAction()
    {
        $categoria = $this->_getParam("id");
        $productoModelo = new Application_Model_Producto;
        
        $dataCategoria = $this->_categoriaModelo->find($categoria)->current();
        
        $this->view->nombre_categoria = $dataCategoria->nom_cat;
        $listaProducto = $productoModelo->searchByCategoria($categoria);
        $this->view->productos = $listaProducto;
        $this->view->cantidad = count($listaProducto);
    }
    
    public function listadoAction()
    {
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        if ($this->getRequest()->isXmlHttpRequest())
        {
            echo Zend_Json::encode($this->_categoriaModelo->listado());
            
        }        
        
    }


}

