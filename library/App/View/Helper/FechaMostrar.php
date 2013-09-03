<?php
class App_View_Helper_FechaMostrar extends Zend_View_Helper_HtmlElement
{
    
    public function FechaMostrar($fecha)
    {
        //$fecha = new Zend_Date($fecha);
        //return date("d/m/Y", $fecha->getTimestamp());
        
        $fecha = explode('-', substr($fecha,0,10));
        $fecha = $fecha[2].'-'.$fecha[1].'-'.$fecha[0];
        return $fecha;
    }

}

