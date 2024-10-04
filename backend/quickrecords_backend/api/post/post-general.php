
<?php

use Masterminds\HTML5\Parser\UTF8Utils;

    require_once __DIR__ . '/../get/utils/fetchTable.php';
      
      
       
    if($act === "INSERT"){
      require_once 'utils/insertToDb.php';
      $res =  insertIntoDatabase($conn, $table, $fields, $values, $types);
         if($res['ok']){
            $sql = "SELECT * FROM $table";
            $newTable = fetchTable($conn, $sql);
            echo $newTable;
         }else{
            echo json_encode(['ok' => false, 'error' => $res]);
         }
    }else if($act === "UPDATE"){
      require_once __DIR__ . '/../update/utils/updateDb.php';
      $res =  updateDatabase($conn, $table, $fields, $values, $types, $whereField, $whereValue, $whereType);
       if($res['ok']){
            $sql = "SELECT * FROM $table";
            $newTable = fetchTable($conn, $sql);
            echo $newTable;
       }else{
          echo json_encode(['ok' => false, 'error' => $res]);
       }
    }