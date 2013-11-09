<?php

class Admin_LogicaController extends App_Controller_Action_Admin {

    private $_formResponder;
    private $_contacto;

    public function init() {

        parent::init();
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
        $this->_formResponder = new Application_Form_ResponderCorreo;
        $this->_contacto = new Application_Model_Contacto;
    }

    public function indexAction() {
        
    }

    public function contactoCorreoAction() {
        $id = $this->_getParam('id');
        $data = $this->_contacto->fetchRow("id = " . $id);
        $this->_formResponder->populate($data->toArray());

        echo $this->_formResponder;
    }

    public function enviarCorreoContactoAction() {
        $data = $this->_getAllParams();

        $filtro = new Zend_Filter_StripTags();
        foreach ($data as $key => $val) {
            $data[$key] = $filtro->filter(trim($val));
        }

        if (!empty($data['respuesta'])) {
            
            try {
                $db = $this->getAdapter();
                $db->beginTransaction();
                $mailer = new App_Controller_Action_Helper_Mail();
                $datos = array(
                    'respondido' => 1,
                    'respuesta' => $data['respuesta'],
                    'fecha_respuesta' => date('Y-m-d H:i:s')
                );

                $where = $this->getAdapter()->quoteInto('id = ?', $data['id']);
                $this->_contacto->update($datos, $where);
                $db->commit();
                
                $data['to'] = $data['correo'];
                $mailer->responderCorreo($data);
            
            echo Zend_Json::encode('Mensaje enviado satisfactoriamente');
            
            } catch (Zend_Db_Exception $e) {
                $db->rollBack();
                $mensaje = $e->getMessage();
                echo Zend_Json::encode($mensaje);
            } catch (Zend_Exception $e) {
                $mensaje = $e->getMessage();
                echo Zend_Json::encode($mensaje);
            }
        }
        else
            echo Zend_Json::encode("Ingrese respuesta");
    }

}

