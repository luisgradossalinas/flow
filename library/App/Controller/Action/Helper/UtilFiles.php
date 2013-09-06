<?php


class App_Controller_Action_Helper_UtilFiles extends Zend_Controller_Action_Helper_Abstract
{
      
    public function _generarImagenes($imagen)
    {
        $config = Zend_Registry::get("config");
        $anchoLarge = $config->constantes->imagen->large->ancho;
        $altoLarge = $config->constantes->imagen->large->alto;
        
        $appRuta = $config->app->elementsImgRoot;
        $appLarge = $config->app->elementsImgLarge;
        $appSmall = $config->app->elementsImgSmall;
        
        $anchoSmall = $config->constantes->imagen->small->ancho;
        $altoSmall = $config->constantes->imagen->small->alto;
        
        //Large
        $this->_redimensionar_jpeg(
            $appRuta.$imagen,
            $appLarge.$imagen,
            $anchoLarge,
            $altoLarge
        );
        
        //Small
        $this->_redimensionar_jpeg(
            $appRuta.$imagen,
            $appSmall.$imagen,
            $anchoSmall, 
            $altoSmall
        );     
        
        @unlink($appRuta.$imagen);
        
    }

    /* ----------------------------------------
     * Funcion que redimensiona una imagen
     * --------------------------------------- */

    public function _redimensionar_jpeg($imgOriginal,
        $imgNueva, $imgNuevaAnchura, $imgNuevaAltura)
    {
        $img = new ZendImage();
        $img->loadImage($imgOriginal);
        
        if($img->width > $img->height)
            $img->resize($imgNuevaAnchura, 'width');
        else
            $img->resize($imgNuevaAltura, 'height');

        $img->save($imgNueva);
    }
    
    public function hola($mensaje)
    {
        return $mensaje;
    }

}
