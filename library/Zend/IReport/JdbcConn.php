<?php
require_once 'Zend/Loader.php';

class Zend_IReport_JdbcConn extends Zend_IReport_JdbcConnection {
    function  __construct() {
      //  $db=Zend_Db_Table::getDefaultAdapter();
      //  $conexData=$db->getConfig();
        //ANTONIO-PC  ADDON-DESA
        parent::__construct("com.mysql.jdbc.Driver","jdbc:mysql://localhost/auditoria","root","123");
      //  parent::__construct("com.microsoft.sqlserver.jdbc.SQLServerDriver","jdbc:sqlserver://".NAME_PC.":1433;databaseName={$conexData['dbname']}","{$conexData['username']}","{$conexData['password']}");
//        parent::__construct("com.microsoft.sqlserver.jdbc.SQLServerDriver","jdbc:sqlserver://{$conexData['host']}:1433;databaseName={$conexData['dbname']}","{$conexData['username']}","{$conexData['password']}");
    }
}

?>
