<?php

class Default_IndexController extends Zend_Controller_Action
{

    private $_categoriaModelo;
    private $_carritoModelo;
    private $_usuarioModelo;
    private $_contactoModelo;

    public function init()
    {
       $this->_helper->layout->setLayout("inicio");
       $this->_categoriaModelo = new Application_Model_Categoria;
       $this->_carritoModelo = new Application_Model_Carrito;
       $this->_usuarioModelo = new Application_Model_Usuario;
       $this->_contactoModelo = new Application_Model_Contacto;
       Zend_Layout::getMvcInstance()->assign(array("categoria" => $this->_categoriaModelo->listadoWeb()));
       // $this->view->headLink()->appendStylesheet(SITE_URL. '/css/grddid.css');
    }

    public function indexAction()
    {
      $productoModelo = new Application_Model_Producto;
      $this->view->productos = $productoModelo->searchByCategoria(17);
    }

    public function contactoAction()
    {
        $this->_helper->layout->setLayout("layout");
        $form = new Application_Form_Contacto;
        Zend_Layout::getMvcInstance()->assign('active', 'contacto');
        $this->view->mensaje = '';
         
         if ($this->getRequest()->isPost()) {
             $data = $this->_getAllParams();
             $filtro = new Zend_Filter_StripTags;
             
             foreach ($data as $key => $value) {
                 $data[$key] = $filtro->filter(trim($value));
             }
             
             if ($form->isValid($data)) {   
                $this->_contactoModelo->guardar($data);
                $form->reset();
                $this->view->mensaje = "Mensaje enviado correctamente.";
            }
             
             //Envío de correo en hosting cuando se tenga php 5.2.4
             $this->_helper->mail->contactoWeb(
                 array(
                     'to' => $data["correo"],
                     'pagina_web' => PAGINA_WEB,
                     'nombres' => $data["nombres"],
                     'celular' => $data["celular"],
                     'mensaje' => $data["mensaje"]
                 )
             );
         }
         $this->view->form = $form;
         
    }

    public function registroAction()
    {
        $this->_helper->layout->setLayout("layout");
        $this->view->headScript()->appendFile(SITE_URL.'/js/web/registro.js');
        $this->view->headScript()->appendFile(SITE_URL.'/js/plugins/jquery.validate.js');
        $this->view->headScript()->appendFile(SITE_URL.'/js/plugins/jquery.maskedinput-1.2.2.min.js');
        
        Zend_Layout::getMvcInstance()->assign('active', 'registro');
        
        $form = new Application_Form_RegistroUsuario;
        $this->view->mensaje = '';
        
        if ($this->getRequest()->isPost()) {

            $filtro = new Zend_Filter_StripTags;
            $data = $this->_getAllParams();
            foreach ($data as $key => $value) 
                $data[$key] = $filtro->filter(trim($value));
            
            if ($form->isValid($data)) {  
                
                $db = $this->getAdapter();
                
                try {
                    $db->beginTransaction();
                    $data['id_rol'] = Application_Model_Rol::CLIENTE_WEB;
                    $this->_usuarioModelo->guardar($data);
                    $form->reset();
                    $this->view->mensaje = '<br>Registro grabado con éxito puede loguearse';
                    
                } catch (Zend_Db_Exception $e) {
                     $db->rollBack();
                     //Restricción unique para el campo de email
                     if ($e->getCode() == 23000)
                     $this->view->mensaje = "<br>El correo ".$data['email']." ya está registrado";
                     else
                     $this->view->mensaje = "<br>" . $e->getMessage();    
                } catch (Zend_Exception $e) {
                    $this->view->mensaje =  $e->getMessage();
                }
                
            }
            
        }
        $this->view->form = $form;
    }
    
    public function carritoAction()
    {
        $this->_helper->layout->setLayout("layout");
        $sessionCarrito = new Zend_Session_Namespace('carrito');
        //Actualiza carrito
        if ($this->getRequest()->isPost()) {
            $data = $this->_getAllParams();
            $nRegCarrito = count($this->_getParam('cant'));
            
            for ($i=0; $i < $nRegCarrito; $i++) {
                $where = $this->_carritoModelo->getAdapter()->quoteInto('id_prod = ?', $data['producto'][$i]);
                $this->_carritoModelo->update(
                    array(
                        'cantidad' => $data['cant'][$i],
                        'subtotal' => $data['precio'][$i] * $data['cant'][$i]
                    ),
                    $where
                );
            }
        }
         //Calcula totales
        $dataCarrito = $this->getAdapter()->select()->from(Application_Model_Carrito::TABLA)
                           ->where('usuario = ?', $sessionCarrito->id)->query()->fetchAll();
        
        $total = 0;
        foreach ($dataCarrito as $key)
            $total += $key['subtotal'];
        
        $this->view->carrito = $this->_carritoModelo->fetchAll("usuario = ".$sessionCarrito->id);
        $this->view->total = $total;
        
        
    }
    
    public function correoAction()
    {
        //$this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
        //echo $_SERVER['DOCUMENT_ROOT'];
        //echo APPLICATION_PATH;
        
        $subjects = new Zend_Config_Ini(APPLICATION_PATH . '/configs/mailing.ini', 'subjects');
        print_r($subjects->toArray());
        
    }


}







