<?php

class App_Controller_Action_Helper_WebServiceConsultaPrecioAnuncioPref 
    extends Zend_Controller_Action_Helper_Abstract
{
    private $_descuentoAviso;
    public function __construct()
    {
        $this->_config = Zend_Registry::get('config');
    }
    
    public function getSubArrayByKeyValues($array, $keyValues) 
    {
        $subArray = array();
        foreach ($keyValues as $key) {
            if (isset($array[$key])) {
            $subArray[$key] = $array[$key];
            }
        }
        
        return $subArray;
    }
    
    public function consulta($dataConsulta)
    {
        $ws = new Zend_Soap_Client($this->_config->adecsysPreferenciales->wsdl);
        $cliente = $ws->getSoapClient();
        $params = array();
        $params["Calculo_Tar_Pref_InputBE"] = array();
            
        //var_dump($this->_config->SCOT->wsdl);
        //var_dump($ws->getTypes());
        //exit;
        
        $rowEmp = $dataConsulta["dataExt"];
        
        $tamanio = strtoupper($rowEmp["tamano"]);
        $funcion = "getTarifa";
        
        //$dataConsulta["dataWS"]["Num_Doc"] = "20100132592";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "4470";
        
        //$dataConsulta["dataWS"]["Num_Doc"] = "20297868790";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "4600";
        
        //$dataConsulta["dataWS"]["Num_Doc"] = "20100132593";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "4471";
        
        //$dataConsulta["dataWS"]["Num_Doc"] = "20143860176";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "100";
        
        // SOLO CREDITO
        //$dataConsulta["dataWS"]["Num_Doc"] = "20504541267";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "797210";
        
        //$dataConsulta["dataWS"]["Num_Doc"] = "20507545379";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "755009";
        
        // SOLO MEMBRESIA
        //$dataConsulta["dataWS"]["Num_Doc"] = "20107203975";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "102";
        
        //$dataConsulta["dataWS"]["Num_Doc"] = "20395492129";
        //$dataConsulta["dataWS"]["Cod_Cliente"] = "815006";
        
        $dataConsulta["dataWS"]["ValorSemana"] = "1";
        $colRow = explode("x", $rowEmp["tamano"]);
        $dataConsulta["dataWS"]["ValorMedidaTarifa"] = $colRow[0] * $colRow[1];
        //var_dump($rowEmp);
        //var_dump($this->_config->adecsysPreferenciales->$tipo->$tamanio->toArray());
        //var_dump($this->_config->adecsysPreferenciales->$funcion->toArray());
        
        //var_dump($dataConfig);
        
        if ($rowEmp["medioPublicacion"] == Application_Model_Tarifa::MEDIOPUB_APTITUS) {
            $tipo = Application_Model_Tarifa::MEDIOPUB_APTITUS;
            
            $dataTam = $this->_config->adecsysPreferenciales->$tipo->$tamanio->toArray();
            
            $dataConfig = $this->getSubArrayByKeyValues(
                $this->_config->adecsysPreferenciales->$tipo->general->toArray(),
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfig = $dataConfig + $this->getSubArrayByKeyValues(
                $dataTam,
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfig = $dataConfig + $dataConsulta["dataWS"];
            
            $params["Calculo_Tar_Pref_InputBE"][] = $dataConfig;
            
            $response = $this->callWSCalcularImporte($ws, $params, $rowEmp, $tipo);
        } else if ($rowEmp["medioPublicacion"] == Application_Model_Tarifa::MEDIOPUB_TALAN) {
            $tipo = Application_Model_Tarifa::MEDIOPUB_TALAN;
            
            $dataTam = $this->_config->adecsysPreferenciales->$tipo->$tamanio->toArray();
            
            $dataConfig = $this->getSubArrayByKeyValues(
                $this->_config->adecsysPreferenciales->$tipo->general->toArray(),
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfig = $dataConfig + $this->getSubArrayByKeyValues(
                $dataTam,
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfig = $dataConfig + $dataConsulta["dataWS"];
            
            $params["Calculo_Tar_Pref_InputBE"][] = $dataConfig;
            
            $response = $this->callWSCalcularImporte($ws, $params, $rowEmp, $tipo);
        } else if ($rowEmp["medioPublicacion"] == Application_Model_Tarifa::MEDIOPUB_APTITUS_TALAN) {
            $tipo = Application_Model_Tarifa::MEDIOPUB_APTITUS."Combo";
            $tipoT = Application_Model_Tarifa::MEDIOPUB_APTITUS;
            
            $dataTam = $this->_config->adecsysPreferenciales->$tipo->$tamanio->toArray();
            
            $dataConfig = $this->getSubArrayByKeyValues(
                $this->_config->adecsysPreferenciales->$tipoT->general->toArray(),
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfig = $dataConfig + $this->getSubArrayByKeyValues(
                $dataTam,
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfig = $dataConfig + $dataConsulta["dataWS"];
            //var_dump($dataConfig);
            $params["Calculo_Tar_Pref_InputBE"][] = $dataConfig;
            
            
            $tipo = Application_Model_Tarifa::MEDIOPUB_TALAN."Combo";
            $tipoT = Application_Model_Tarifa::MEDIOPUB_TALAN;
            
            $dataTamB = $this->_config->adecsysPreferenciales->$tipo->$tamanio->toArray();

            $dataConfigB = $this->getSubArrayByKeyValues(
                $this->_config->adecsysPreferenciales->$tipoT->general->toArray(),
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfigB = $dataConfigB + $this->getSubArrayByKeyValues(
                $dataTamB,
                $this->_config->adecsysPreferenciales->$funcion->toArray()
            );

            $dataConfigB = $dataConfigB + $dataConsulta["dataWS"];
            
            $dataFecha = array();
            foreach ($dataConfig["Fechas_Pub_Aviso"] as $date) $dataFecha[] = $date;
            $dataConfigB["Fechas_Pub_Aviso"] = $dataFecha;
            //var_dump($dataConfigB);
            $params["Calculo_Tar_Pref_InputBE"][] = $dataConfigB;

            //var_dump($params["Calculo_Tar_Pref_InputBE"][0]);
            //var_dump($params["Calculo_Tar_Pref_InputBE"][1]);
            $response = $this->callWSCalcularImporte($ws, $params, $rowEmp, "Combo");
        }
        
        $esVip = false;
        $estadoEnte = false;
        
        // @codingStandardsIgnoreStart
        $response = $response->CalcularImportes_ContratoResult;
        if (isset ($response->ErrorCodigo) && $response->ErrorCodigo != 0) return null;
        //if (trim($response->TipoCliente) == "VIP") $esVip = true;
        if (trim($response->EnteActivo) == "S") $estadoEnte = true;
        // @codingStandardsIgnoreEnd
        
        
        
        $contratosAdecsys = array();
        //$contratosAdecsys[] = (array) $response->lstContratoBE->ContratosBE;
        //var_dump($response->lstContratoBE);
        
        
        if (is_array($response->lstContratoBE->ContratosBE)) {
            
            foreach ($response->lstContratoBE->ContratosBE as $cAdecsys) {
                $contratosAdecsys[] = (array) $cAdecsys;
            }
        } else if (is_object($response->lstContratoBE->ContratosBE)) {
            $contratosAdecsys[] = (array) $response->lstContratoBE->ContratosBE;
        }
        //var_dump($contratosAdecsys); 
        //exit;
        
        $contratosValidos = array();
        
        $mcNormal = null;
        $mcContado = null;
        $mcCredito = null;
        $mcMembresia = null;
        $mcContratoA = null;
        $mcContratoB = null;
                
        $mcNormal = $this->escogerContratoMenorPrecio($contratosAdecsys, "N", "C");
        $mcContado = $this->escogerContratoMenorPrecio($contratosAdecsys, "C", "C");
        if ($estadoEnte) {
            $mcCredito = $this->escogerContratoMenorPrecio($contratosAdecsys, "R", "R");
            $mcMembresiaCredito = $this->escogerContratoMenorPrecio($contratosAdecsys, "Z", "R");
            
            $mcMembresia = $this->escogerContratoMenorPrecio($contratosAdecsys, "Z", "C");
            $mcContratoA = $this->escogerContratoMenorPrecio($contratosAdecsys, "I", "C");
            $mcContratoB = $this->escogerContratoMenorPrecio($contratosAdecsys, "E", "C");
        }
        /*
        switch ($rowEmp["modalidadEmpresa"]) {
            case "M": 
                $mcNormal = $this->escogerContratoMenorPrecio($contratosAdecsys, "N");
                $mcContado = $this->escogerContratoMenorPrecio($contratosAdecsys, "C");
                if ($estadoEnte) {
                    $mcCredito = $this->escogerContratoMenorPrecio($contratosAdecsys, "R");
                    $mcMembresia = $this->escogerContratoMenorPrecio($contratosAdecsys, "Z");
                    $mcContratoA = $this->escogerContratoMenorPrecio($contratosAdecsys, "I");
                    $mcContratoB = $this->escogerContratoMenorPrecio($contratosAdecsys, "E");
                }
                break;
            
            case "C": 
                $mcNormal = $this->escogerContratoMenorPrecio($contratosAdecsys, "N");
                $mcContado = $this->escogerContratoMenorPrecio($contratosAdecsys, "C");
                if ($estadoEnte) {
                    $mcCredito = $this->escogerContratoMenorPrecio($contratosAdecsys, "R");
                    $mcContratoA = $this->escogerContratoMenorPrecio($contratosAdecsys, "I");
                    $mcContratoB = $this->escogerContratoMenorPrecio($contratosAdecsys, "E");
                }
                break;
            
            case "N": 
                $mcNormal = $this->escogerContratoMenorPrecio($contratosAdecsys, "N");
                $mcContado = $this->escogerContratoMenorPrecio($contratosAdecsys, "C");
                if ($estadoEnte) {
                    $mcCredito = $this->escogerContratoMenorPrecio($contratosAdecsys, "R");
                    $mcContratoA = $this->escogerContratoMenorPrecio($contratosAdecsys, "I");
                    $mcContratoB = $this->escogerContratoMenorPrecio($contratosAdecsys, "E");
                }
                break;
        }*/

        // ******************* MENOR PRECIO ENTRE LOS 3
        /*if ($mcMembresia != null) $contratosValidos[] = $mcMembresia;
        
        if ($mcContratoA != null && $mcContratoB != null) {
            if ($mcContratoA["MontoAPagar"] < $mcContratoB["MontoAPagar"]) {
                $contratosValidos[] = $mcContratoA;
            } else {
                $contratosValidos[] = $mcContratoB;
            }
        }
        else if ($mcContratoA != null) $contratosValidos[] = $mcContratoA;
        else if ($mcContratoB != null) $contratosValidos[] = $mcContratoB;*/
        //***************************
        
        if ( $mcMembresia != null && $mcContratoA != null && $mcContratoB != null) {
            
            if ($mcMembresia["MontoAPagar"] < $mcContratoA["MontoAPagar"] && 
                $mcMembresia["MontoAPagar"] < $mcContratoB["MontoAPagar"]) {
                $contratosValidos[] = $mcMembresia;
            } elseif ($mcContratoA["MontoAPagar"] < $mcMembresia["MontoAPagar"] && 
                $mcContratoA["MontoAPagar"] < $mcContratoB["MontoAPagar"]) {
                $contratosValidos[] = $mcContratoA;
            } elseif ($mcContratoB["MontoAPagar"] < $mcMembresia["MontoAPagar"] && 
                $mcContratoB["MontoAPagar"] < $mcContratoA["MontoAPagar"]) {
                $contratosValidos[] = $mcContratoB;
            }
            
        } elseif ($mcMembresia != null && $mcContratoA != null) {
            
            if ($mcMembresia["MontoAPagar"] < $mcContratoA["MontoAPagar"]) {
                $contratosValidos[] = $mcMembresia;
            } else {
                $contratosValidos[] = $mcContratoA;
            }
            
        } elseif ($mcMembresia != null && $mcContratoB != null) {
            
            if ($mcMembresia["MontoAPagar"] < $mcContratoB["MontoAPagar"]) {
                $contratosValidos[] = $mcMembresia;
            } else {
                $contratosValidos[] = $mcContratoB;
            }
            
        } elseif ($mcContratoA != null && $mcContratoB != null) {
            
            if ($mcContratoA["MontoAPagar"] < $mcContratoB["MontoAPagar"]) {
                $contratosValidos[] = $mcContratoA;
            } else {
                $contratosValidos[] = $mcContratoB;
            }
            
        } elseif ($mcMembresia != null) {
            $contratosValidos[] = $mcMembresia;
        } elseif ($mcContratoA != null) {
            $contratosValidos[] = $mcContratoA;
        } elseif ($mcContratoB != null) {
            $contratosValidos[] = $mcContratoB;
        }
        
        
        
        
        
        
        if ($mcContado != null && $mcNormal != null) {
            if ($mcContado["MontoAPagar"] < $mcNormal["MontoAPagar"]) {
                $contratosValidos[] = $mcContado;
            } else {
                $contratosValidos[] = $mcNormal;
            }
        }
        else if ($mcContado != null) $contratosValidos[] = $mcContado;
        else if ($mcNormal != null) $contratosValidos[] = $mcNormal;
        
        if ($mcCredito != null && $mcMembresiaCredito != null) {
            if ($mcCredito["MontoAPagar"] < $mcMembresiaCredito["MontoAPagar"]) {
                $contratosValidos[] = $mcCredito;
            } else {
                $contratosValidos[] = $mcMembresiaCredito;
            }
        }
        else if ($mcCredito != null) $contratosValidos[] = $mcCredito;
        else if ($mcMembresiaCredito != null) $contratosValidos[] = $mcMembresiaCredito;
        //if ($mcCredito != null) $contratosValidos[] = $mcCredito;
        //
        //var_dump($contratosValidos);
        $dataReturn = array();
        $dataReturn["esVip"] = $esVip;
        $dataReturn["contratos"] = $contratosValidos;
        return $dataReturn;
    }
    
    private function callWSCalcularImporte($ws, $params, $rowEmp, $tipoPublicacion) 
    {
        $response = null;
        try {
            $response = $ws->CalcularImportes_Contrato(array('olistCalculo_Tar_Pref_InputBE' => $params));
            file_put_contents(
                APPLICATION_PATH . '/../logs/Impreso_'.$tipoPublicacion.'_'.
                $rowEmp['anuncioImpresoId'].'_ConsultaTarifa_envio.xml', $ws->getLastRequest(), FILE_APPEND
            );
            file_put_contents(
                APPLICATION_PATH . '/../logs/Impreso_'.$tipoPublicacion.'_'.
                $rowEmp['anuncioImpresoId'].'_ConsultaTarifa_rpta.xml', $ws->getLastResponse(), FILE_APPEND
            );
        } catch (Exception $ex) {
            file_put_contents(
                APPLICATION_PATH . '/../logs/Impreso_'.$tipoPublicacion.'_'.
                $rowEmp['anuncioImpresoId'].'_ConsultaTarifa_envio_ERROR.xml', $ws->getLastRequest(), FILE_APPEND
            );
            file_put_contents(
                APPLICATION_PATH . '/../logs/Impreso_'.$tipoPublicacion.'_'.
                $rowEmp['anuncioImpresoId'].'_ConsultaTarifa_rpta_ERROR.xml', $ws->getLastResponse(), FILE_APPEND
            );
            //ERROR
        }
        
        return $response;
    }
    
    public function escogerContratoMenorPrecio($listaContratos, $tipo, $formaPago)
    {
        $menorContrato = null;
        foreach ($listaContratos as $contrato) {
            if ($contrato['ModalidadContrato'] == $tipo && $contrato['FormaPago'] == $formaPago) {
                if ($menorContrato == null) {
                    $menorContrato = $contrato;
                } else {
                    if ($menorContrato["MontoAPagar"] > $contrato["MontoAPagar"]) {
                        $menorContrato = $contrato;
                    }
                }
            }
        }
        return $menorContrato;
    }
    
    public function dataVistaContratos($contratos, $precioNormal)
    {
        $preciosContratos = array();
        $tieneCredito = false;
        $tieneMembresia = false;
        $tieneContrato = false;
        $montoContrato = -1;
        $contratosB = array();
        $tipoContrato = "";
        foreach ($contratos as $contra) {
            $agregar = true;
            $contra["TipoContrato"] = $contra["ModalidadContrato"];
            switch ($contra["ModalidadContrato"]) {
                case Application_Model_Compra::TIPO_CONTRATO_MEMBRESIA :
                    //$tieneMembresia = true;
                    //break;
                case Application_Model_Compra::TIPO_CONTRATO_MULTIMEDIOS : 
                case Application_Model_Compra::TIPO_CONTRATO_UNIPRODUCTO : 
                    if ($contra["FormaPago"] == "C") {
                        $tipoContrato = $contra["ModalidadContrato"];
                        $tieneContrato = true;
                        $montoContrato = $contra["MontoAPagar"];
                        $agregar = false;
                    } else {
                        $tieneCredito = true;
                    }
                    break;
                case Application_Model_Compra::TIPO_CONTRATO_CREDITO : 
                    $tieneCredito = true; 
                    break;
                case Application_Model_Compra::TIPO_CONTRATO_NINGUNO : 
                case Application_Model_Compra::TIPO_CONTRATO_CONTADO : 
                    $contra["MontoAPagar"] = $tieneContrato ? $montoContrato : $precioNormal;
                    $contra["TipoContrato"] = Application_Model_Compra::TIPO_CONTRATO_NINGUNO;
                    break;
            }
            
            //var_dump($contra);
            
            if ($agregar) {
                $precioContrato = array();
                $precioContrato["tipo"] = $contra["TipoContrato"];
                $precioContrato["formaPago"] = $contra["FormaPago"];
                $precioContrato["precio"] = number_format($contra['MontoAPagar'], '2', '.', ',');
                $precioContrato["descuento"] = $precioNormal - $contra['MontoAPagar'];
                if ($precioContrato["descuento"] <= 0) {
                    $precioContrato["descuento"] = 0;
                }
                $precioContrato["descuento"] = number_format($precioContrato["descuento"], '2', '.', ','); 
                $precioContrato["saldo"] = number_format($contra['SaldoInicial'], '2', '.', ',');
                $preciosContratos[] = $precioContrato;
            }
            
            
            
            $contratosB[] = $contra;
        }
        
        $contratos = $contratosB;
        
        $dataReturn = array();
        $dataReturn["tipoContrato"] = $tipoContrato; 
        $dataReturn["tieneCredito"] = $tieneCredito; 
        $dataReturn["tieneMembresia"] = $tieneMembresia; 
        $dataReturn["tieneContrato"] = $tieneContrato; 
        $dataReturn["precioContrato"] = $montoContrato; 
        $dataReturn["preciosContratos"] = $preciosContratos;
        $dataReturn["contratos"] = $contratos;
        
        return $dataReturn;
    }
}
