<?php

class App_Controller_Action_Postulante extends App_Controller_Action
{
    const MENU_INICIO = 'inicio';
    const MENU_AVISOS = 'avisos';
    const MENU_MI_CUENTA = 'mi_cuenta';
    const MENU_QUE_ES_APTITUS = 'que_es_aptitus';
    
    const MENU_POST_INICIO = 'inicio_postulante';
    const MENU_POST_MIS_DATOS = 'mis_datos';
    const MENU_POST_MIS_POSTULACIONES = 'mis_postulaciones';
    const MENU_POST_MIS_NOTIFICACIONES = 'mis_notificaciones';
    const MENU_POST_SUBE_CV = 'sube_cv';

    const MENU_POST_SIDE_EXPERIENCIA = 'experiencia';
    const MENU_POST_SIDE_ESTUDIOS = 'estudios';
    const MENU_POST_SIDE_IDIOMAS = 'idiomas';
    const MENU_POST_SIDE_PROGRAMAS = 'programas';
    const MENU_POST_SIDE_REFERENCIAS = 'referencias';
    const MENU_POST_SIDE_PERFILPUBLICO = 'perfilpublico';
    const MENU_POST_SIDE_DATOSPERSONALES = 'datospersonales';
    const MENU_POST_SIDE_CAMBIOCLAVE = 'cambioclave';
    const MENU_POST_SIDE_REDES_SOCIALES= 'redessociales';
    const MENU_POST_SIDE_PRIVACIDAD= 'privacidad';
    const MENU_POST_SIDE_ALERTAS= 'mis_alertas';
   

    public function init()
    {
        parent::init();
        $config = $this->getConfig();
        
        $this->view->headTitle()->set('Aptitus.pe - ' . $config->app->title);
        
        Zend_Layout::getMvcInstance()->assign('AppFacebook', $config->apis->facebook);
        Zend_Layout::getMvcInstance()->assign(
            'urlAuthAppFacebook', 
            $config->app->siteUrl.'/auth/validacion-facebook'
        );
        Zend_Layout::getMvcInstance()->assign(
            'urlAuthAppGoogle', 
            sprintf(
                $config->apis->google->openidUrl, 
                $config->app->siteUrl.$config->apis->google->returnUrlAuth,
                $config->app->siteUrl
            )
        );
        /*Zend_Layout::getMvcInstance()->assign(
            'recuperarClaveForm',
            new Application_Form_RecuperarClave()
        );*/
        
        Zend_Layout::getMvcInstance()->assign(
            'loginForm',
            Application_Form_Login::factory(
                Application_Form_Login::ROL_POSTULANTE
            )
        );

        $this->view->flashMessages=$this->_flashMessenger;
        
    }
}