<?php
class App_Db_Table_FechaBD extends Zend_Db_Table_Abstract
{
    
    public function FechaBD($fecha)
    {
        $fecha = explode('-', substr($fecha,0,10));
        $fecha = $fecha[2].'-'.$fecha[1].'-'.$fecha[0];
        return $fecha;
    }

}

