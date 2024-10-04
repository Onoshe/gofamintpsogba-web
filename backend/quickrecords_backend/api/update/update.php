
<?php

use Masterminds\HTML5\Parser\UTF8Utils;

    require_once 'utils/updateDb.php';
    require_once __DIR__ . '/../get/utils/fetchTable.php';

    //updateDatabase($conn, $table, $fields, $values, $types, $whereField, $whereValue, $whereType);
    if($act === "UPDATE"){
       $res =  updateDatabase($conn, $table, $fields, $values, $types, $whereField, $whereValue, $whereType);
       if($res['ok']){
            $sql = "SELECT * FROM $table";
            $newTable = fetchTable($conn, $sql);
            echo $newTable;
       }
    }