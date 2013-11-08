<?php

class Default_TestController extends Zend_Controller_Action {

    public function init() {

    }

    public function indexAction() {
        
    }
    
    //Enviar mensajes de prueba
    public function plantillaAction(){
        
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        
            $mailer = new App_Controller_Action_Helper_Mail();
            $dataMail = array (
                 'to' => 'martin.programmer@outlook.com',
                  'pagina_web' => PAGINA_WEB,
                  'nombres' => 'Luis Martin Grados Salinas',
                  'celular' => '987603599',
                  'mensaje' => 'holaaa',
                'usuario' => 'Paul',
                'nombre' => 'Carlos Carlos',
                'anuncioPuesto' => 'Nuevo Puesto',
                'razonSocial' => 'Club de Suscriptores',
                'montoTotal' => '1,500',
                'medioPago' => 'Pago Efectivo',
                'anuncioClase' => 'clasificado',
                'productoNombre' => 'Oro',
                'anuncioUrl' => 'http://devel.aptitus.info/ofertas-de-trabajo/aviso-primero-2uzgj',
                'fechaPago' => date('Y/m/d'),
                'anuncioFechaVencimiento' => 'del 18 may 2012 hasta 01 jun 2012',
                'fechaPublicConfirmada' => '20 may 2012',
                'medioPublicacion' => 'aptitus',
                'anuncioSlug' => '2uzgj',
                'anuncioFechaVencimientoProceso' => 'del 18 may 2012 hasta 17 jun 2012',
                'codigo_adecsys_compra' => '0'
            );
            //$mailer->confirmarCompra($dataMail);
            
            $mailer->contactoWeb($dataMail);

        
        
        
    }

}

