<?php

class Admin_UsuarioController extends App_Controller_Action_Admin
{
    
    const INACTIVO = 0;
    const ACTIVO = 1;
    const ELIMINADO = 2;
    
    private $_usuario;
    private $_form;
    
    public function init()
    {
        parent::init();
        $this->view->headScript()->appendFile(SITE_URL.'/js/web/usuario.js');
        Zend_Layout::getMvcInstance()->assign('btnNuevo','1');
        $this->_usuario = new Application_Model_Usuario;
        $this->_form = new Application_Form_Usuario;
    }
    
    public function indexAction()
    {
        Zend_Layout::getMvcInstance()->assign('link', 'Usuarios');
        Zend_Layout::getMvcInstance()->assign('active', 'Usuario');
        Zend_Layout::getMvcInstance()->assign('padre', 2);
        
        $this->view->model = 'Usuario';
        $this->view->active = 'Usuarios';
            
        $this->view->data = $this->_usuario->listado();
    }
    
    public function listadoAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
        $data = $this->_getAllParams();

        //Previene vulnerabilidad XSS (Cross-site scripting)
        $filtro = new Zend_Filter_StripTags();
        foreach ($data as $key => $val) {
            $data[$key] = $filtro->filter(trim($val));
        }

        
        if ($this->_getParam('ajax') == 'listado') {
            if ($this->_hasParam('id_rol')) {
                $rol = $this->_getParam('id_rol');
                $recurso = new Application_Model_Recurso;
                //$listadoRecursos = $recurso->fetchAll('estado ='. self::ACTIVO)->toArray();
                $listadoRecursos = $recurso->listadoPorRol($rol);
                echo Zend_Json::encode($listadoRecursos);

                
                
            }
        }

    }
    
    public function operacionAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);

        $data = $this->_getAllParams();
        
        //Previene vulnerabilidad XSS (Cross-site scripting)
        $filtro = new Zend_Filter_StripTags();
        foreach ($data as $key => $val) {
            $data[$key] = $filtro->filter(trim($val));
        }
        
        if ($this->_getParam('ajax') == 'form') {
            
            if ($this->_hasParam('id')) {
                
                $id = $this->_getParam('id');
                if ($id != 0) {
                    $data = $this->_usuario->fetchRow('id = '.$id);
                    $this->_form->populate($data->toArray());
                } else {
                //$form->sete
                //$this->form->clave->setRequired();
                $this->_form->getElement('clave')->setRequired(true);
                }
            } 
            echo $this->_form;         
        }
        
        if ($this->_getParam('ajax') == 'validar') {
            if ($this->_getParam('ope') == 'nuevo')
                $this->_form->getElement('clave')->setRequired(true);
            
                echo $this->_form->processAjax($data);
        }
        
        if ($this->_getParam('ajax') == 'delete') {
            
            $where = $this->getAdapter()->quoteInto('id = ?',$data['id']);
            $this->_usuario->update(array('estado' => self::ELIMINADO),$where);
            
            $sesionMvc->messages = 'Registro eliminado';
            $sesionMvc->tipoMessages = self::SUCCESS;
                    
        }
        
        if ($this->_getParam('ajax') == 'save') {
      
            if ($this->_getParam('scrud') == 'nuevo') {
                $data['fecha_registro'] = date("Y-m-d H:i:s");
                //$data['usuario_crea'] = Zend_Auth::getInstance()->getIdentity()->id;
                $sesionMvc->messages = 'Registro agregado satisfactoriamente';
            } else {
                //$data['fecha_actu'] = date("Y-m-d H:i:s");
                //$data['usuario_actu'] = Zend_Auth::getInstance()->getIdentity()->id;
                $sesionMvc->messages = 'Registro actualizado satisfactoriamente';
            }
            
            $sesionMvc->tipoMessages = self::SUCCESS;
            
            if (!empty($data['clave']))
                $data['clave'] = md5 ($data['clave']);
            else
                unset($data['clave']);
            
            $this->_usuario->guardar($data);
        }
    }

}



