<?php

class App_Controller_Action_Empresa extends App_Controller_Action
{
    const MENU_INICIO = 'inicio';
    const MENU_AVISOS = 'avisos';
    const MENU_MI_CUENTA = 'mi_cuenta';
    const MENU_QUE_ES_APTITUS = 'que_es_aptitus';
    const MENU_NUEVO_EN_APTITUS = 'nuevo_en_aptitus';
    const MENU_QUE_ES_APTITUS_EMPRESA = 'que_es_aptitus_empresa';

    const MENU_POST_INICIO = 'inicio_postulante';
    const MENU_POST_MIS_DATOS = 'mis_datos';
    const MENU_POST_MIS_PROCESOS = 'mis_procesos';
    const MENU_POST_PUBLICA_AVISO = 'publica_aviso';
    const MENU_POST_BUSCA_APTITUS = 'busca_aptitus';
    const MENU_POST_MI_ESTADO_CUENTA = 'mi_estado_cuenta';
    const MENU_POST_BOLSA_CVS = 'bolsa_cvs';

    const MENU_POST_SIDE_DATOSEMPRESA = 'datosempresa';
    const MENU_POST_SIDE_MIS_AVISOS = 'misavisos';
    const MENU_POST_SIDE_MIS_ALERTAS = 'misalertas';
    const MENU_POST_SIDE_MIS_MEMBRESIAS = 'membresia';
    const MENU_POST_SIDE_CAMBIOCLAVE = 'cambioclave';
    const MENU_POST_SIDE_ADMINISTRADORES= 'administradores';

    const MENU_POST_SIDE_PROCESOS_ACTIVOS = 'procesosactivos';
    const MENU_POST_SIDE_PROCESOS_CERRADOS = 'procesoscerrados';
    const MENU_POST_SIDE_CANDIDATOS_SUGERIDOS = 'candidatossugeridos';
    const MENU_POST_SIDE_PROCESOS_BORRADORES= 'borradores';
    
    const MENU_SIDEBAR_MI_ESTADO_CUENTA_AVISOS_PAGADOS = 'avisos_pagados';
    const MENU_SIDEBAR_MI_ESTADO_CUENTA_AVISOS_EN_PROCESO = 'avisos_en_proceso';
    const MENU_SIDEBAR_MI_ESTADO_CUENTA_MEMBRESIAS = 'membresias';

    public function init()
    {
        parent::init();
        $config = $this->getConfig();
        
        $this->view->headTitle()->set(
            'Empresa - Aptitus.pe - '.$config->app->title.
            '. Clasificados del Grupo El Comercio '
        );
        
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
        
        Zend_Layout::getMvcInstance()->assign(
            'recuperarClaveForm',
            Application_Form_RecuperarClave::factory(
                Application_Form_Login::ROL_EMPRESA
            )
        );
        Zend_Layout::getMvcInstance()->assign(
            'loginForm',
            Application_Form_Login::factory(Application_Form_Login::ROL_EMPRESA)
        );
        
        Zend_Layout::getMvcInstance()->assign(
            'loginForm',
            Application_Form_Login::factory(Application_Form_Login::ROL_EMPRESA)
        );
        
        $this->view->flashMessages=$this->_flashMessenger;
    }


}