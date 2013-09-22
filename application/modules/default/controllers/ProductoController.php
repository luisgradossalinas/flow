<?php

class Default_ProductoController extends Zend_Controller_Action {

    private $_productoModelo;
    private $_categoriaModelo;
    private $_carritoModelo;

    const ERROR_SIN_TEXTO = "Ingrese palabra a buscar";
    const ERROR_PRODUCTO = 'Error';

    public function init() {
        $this->_productoModelo = new Application_Model_Producto;
        $this->_categoriaModelo = new Application_Model_Categoria;
        $this->_carritoModelo = new Application_Model_Carrito;
        Zend_Layout::getMvcInstance()->assign(array('categoria' => $this->_categoriaModelo->listadoWeb()));
    }

    public function indexAction() {
        $this->_redirect("producto/detalle/id/1");
    }

    public function detalleAction() {
        $this->view->headScript()->appendFile('/js/plugins/jquery.tabs.js');
        $this->view->headScript()->appendFile('/js/plugins/jquery.numeric.js');
        $this->view->headScript()->appendFile('/js/plugins/jquery.validate.js');
        $this->view->headScript()->appendFile('/js/plugins/products.js');
        $this->view->headScript()->appendFile('/js/plugins/jquery.scrollto.js');
        $this->view->headScript()->appendFile('/js/plugins/jquery.serialscroll.js');

        if ($this->getRequest()->isGet()) {
            $filter = new Zend_Filter_StripTags;
            $id = $filter->filter($this->_getParam("id"));

            settype($id, "int");

            if (!is_int($id))
                exit(self::ERROR_PRODUCTO);

            $dataProducto = $this->_productoModelo->fetchRow("id = " . $id);
            if (count($dataProducto) != 1)
                exit(self::ERROR_PRODUCTO);

            $this->view->producto = $dataProducto->toArray();
        }

        if ($this->getRequest()->getPost()) {
            //print_r($this->_getAllParams());exit;
            //Creamos session si no está logueado, 
            //si está logueado grabamos el carrito con su id_usuario
            $userId = null;
            $sesionCarrito = new Zend_Session_Namespace("carrito");
            if (!$this->_validaLogin()) {


                if (!isset($sesionCarrito->id))
                    $sesionCarrito->id = time();

                //$userId = $se
            }
            //Validar si ya está el producto se aumenta la cantidad.
            $userId = $sesionCarrito->id;
            $subtotal = $this->_getParam('cantidad') * $this->_getParam('precio');
            $this->_carritoModelo->insert(
                    array(
                        'id_prod' => $this->_getParam('id'),
                        'nom_prod' => $this->_getParam('nom_prod'),
                        'precio' => $this->_getParam('precio'),
                        'cantidad' => $this->_getParam('cantidad'),
                        'usuario' => $userId,
                        'imagen' => $this->_getParam('imagen'),
                        'subtotal' => $subtotal
                    )
            );

            $this->_redirect(SITE_URL . "/carrito");
        }
    }

    public function buscarAction() {

        if ($this->getRequest()->isPost()) {
            $filtro = new Zend_Filter_StripTags;
            $nombre = $this->_getParam("search");
            $nombre = $filtro->filter($nombre);

            if (empty($nombre) or !$this->_hasParam('search')) {
                $this->view->cant_descripcion = "Hay 0 productos.";
            } else {
                $listaProducto = $this->_productoModelo->searchByNombre($nombre);
                $this->view->productos = $listaProducto;
                $this->view->cant_descripcion = "Hay " . count($listaProducto) . " 
                    producto(s) encontrado(s) con la palabra <b>" . $nombre . "</b>";
            }
        }
    }

    public function eliminarAction() {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();

        if (!$this->getRequest()->isGet()) {
            exit("Acceso denegado");
        }
        $sessionCarrito = new Zend_Session_Namespace('carrito');
        $idProd = $this->_getParam('id');
        $where = array();
        $where[] = $this->getAdapter()->quoteInto('id_prod = ?', $idProd);
        $where[] = $this->getAdapter()->quoteInto('usuario = ?', $sessionCarrito->id);
        //$this->_carritoModelo->delete('id_prod = '.$idProd." and usuario = ".$sessionCarrito->id);
        $this->_carritoModelo->delete($where);

        $this->_redirect(SITE_URL . '/carrito');
    }

    public function addCarritoAction() {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();

        if (!$this->getRequest()->isXmlHttpRequest())
            exit('Acceso denegado');

        $sessionCarrito = new Zend_Session_Namespace('carrito');
        $id = $this->_getParam('id');
        $cantidad = $this->_getParam('cantidad');
        $precio = $this->_getParam('precio');

        //Verificar si está logueado o no
        $usuario = null;

        $where = array();
        $where[] = $this->getAdapter()->quoteInto('id_prod = ?', $id);
        $where[] = $this->getAdapter()->quoteInto('usuario = ?', $sessionCarrito->id);

        $this->getAdapter()->update(Application_Model_Carrito::TABLA, array(
            'cantidad' => $cantidad,
            'subtotal' => $precio * $cantidad
                ), $where
        );

        //Calcula totales
        $dataCarrito = $this->getAdapter()->select()->from(Application_Model_Carrito::TABLA)
                        ->where('usuario = ?', $sessionCarrito->id)->query()->fetchAll();

        $total = 0;
        foreach ($dataCarrito as $key)
            $total += $key['subtotal'];

        echo Zend_Json::encode(array('subtotal' => $precio * $cantidad, 'total' => $total));
    }

    //Verifica si el usuario está logueado
    private function _validaLogin() {
        return false;
    }

}

