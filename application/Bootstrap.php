<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

    public function run() {
        parent::run();
    }

    protected function _initConfig() {
        $config = new Zend_Config($this->getOptions(), true);
        $config->merge(new Zend_Config_Ini(APPLICATION_PATH.'/configs/floreria.ini'));
        Zend_Registry::set('config', $config);
        /*ini_set('session.cookie_secure', 1);
        ini_set('session.cookie_httponly', 1);
        ini_set('session.use_only_cookies', 1);*/

    }
    
    public function _initViewHelpers() {
        $doctypeHelper = new Zend_View_Helper_Doctype();
        $doctypeHelper->doctype(Zend_View_Helper_Doctype::HTML5);
        $this->bootstrap('layout');
        $layout = $this->getResource('layout');
        $view = $layout->getView();
        $config = Zend_Registry::get('config');
        $view->headMeta()->appendHttpEquiv('Content-Type', 'text/html; charset=utf-8');
    
        $js = sprintf(
            "var urls = { 
                siteUrl : '%s', 
            }",
            $config->app->siteUrl
        );
    
        //Constantes usadas en todo el sistema
        define('SITE_URL', $config->app->siteUrl);
        define('V_JS_CSS', $config->app->versionCssJss);
        define('DIR_CACHE', $config->app->cache);
        define('PAGINA_WEB', $config->app->paginaWeb);
        define('TITLE', $config->app->title);
        
        //echo DIR_CACHE;
        $view->headScript()->appendScript($js);
        $view->addHelperPath('App/View/Helper', 'App_View_Helper');
    }
    
    protected function _initLibrerias() {
        require_once(APPLICATION_PATH . "/../library/ZendImage/zendimage.php");   
    }
    
    protected function _initFloreria() {
        date_default_timezone_set('America/Lima');
        Zend_Locale::setDefault('es');
    }
    
    protected function _initRoutes() {
        $this->bootstrap('frontController');
        $router = $this->getResource('frontController')->getRouter();
        $routeConfig = new Zend_Config_Ini(APPLICATION_PATH.'/configs/routes.ini');
        $router->addConfig($routeConfig);
    }

    protected function __initSession() {
        Zend_Session::start();
    }

    protected function _initDbResource() {
        
        $this->_executeResource('db');
        $adapter = $this->getResource('db');
        Zend_Registry::set('db', $adapter);
        
    }
    
    public function _initPlugins() {
        $this->bootstrap('frontcontroller');
        $frontController = $this->getResource('frontcontroller');

        //$plugin = new App_Plugin_SetupFloreria();
        //$frontController->registerPlugin($plugin);
    }
    

}

