<?php

class Admin_ProductoController extends App_Controller_Action_Admin
{
    
    const INACTIVO = 0;
    const ACTIVO = 1;
    const ELIMINADO = 2;
    
    private $_rolrecurso;
    private $_recurso;
    
    public function init()
    {
        parent::init();
        
        $this->_rolrecurso = new Application_Model_RolRecurso;
        $this->_recurso = new Application_Model_Recurso;
    }
    
    public function indexAction()
    {
        $this->view->headScript()->appendFile(SITE_URL. '/js/admin/producto.js');
    }
    
    public function registrofotoAction() 
    {
        $request = $this->getRequest();
        if ($request->isPost()) {
            $config = Zend_Registry::get('config');
            $uploaded_file = new Zend_File_Transfer_Adapter_Http();
            $ruta = $config->constantes->imagen->rutaFisica . $config->constantes->imagen->carpeta;
            $uploaded_file->setDestination($ruta);
            try {
                $file = $uploaded_file->getFileInfo();
                $name = $file['fileFoto']['name'];
                $temp = $file['fileFoto']['tmp_name'];
                $nombre = explode('.', $name);
                $extension = $nombre[1];

                $uploaded_file->receive();

                require_once 'ThumbLib.inc.php';

                $destino_foto1 = $ruta . "/" .$name;
                $nombre = substr($name,0,strlen($name)-4)."_".time() . "." . $extension;
                $destino_foto2 = $ruta . "/".$nombre;
                $thumb = PhpThumbFactory::create($destino_foto1);
                //$thumb->resize(190, 218);
                unlink($destino_foto1);
                $thumb->save($destino_foto2);
                //Crea sesión para guardar foto
                $sessionFoto = new Zend_Session_Namespace("foto");
                $sessionFoto->nombre = $nombre;
                echo $nombre;
                
                //$sessionFoto = new Zend_Session_Namespace("foto");
                $utilfile =   $this->_helper->getHelper('UtilFiles');
                $utilfile->_generarImagenes($sessionFoto->nombre);
                exit;
            } catch (Zend_File_Transfer_Exception $e) {
                echo $e->getMessage();
            }
        }
    }
   
}



