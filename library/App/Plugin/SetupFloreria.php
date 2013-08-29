<?php


class App_Plugin_SetupFloreria extends Zend_Controller_Plugin_Abstract
{
    //put your code here

    public function preDispatch(Zend_Controller_Request_Abstract $request)
    {
        $config = Zend_Registry::get('config');
    }
}
