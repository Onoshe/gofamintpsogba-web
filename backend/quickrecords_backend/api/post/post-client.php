
<?php

use Masterminds\HTML5\Parser\UTF8Utils;

    require_once 'utils/insertToDb.php';
    require_once __DIR__ . '/../get/utils/fetchTable.php';
      
  /*
       $res =  insertIntoDatabase($conn, $table, $fields, $values, $types);
       if($res['ok']){
            $sql = "SELECT * FROM $table";
            $newTable = fetchTable($conn, $sql);
            echo $newTable;
       }else{
          echo json_encode(['ok' => false, 'error' => "Error in posting data"]);
       }
   
       */
      $res = insertIntoDatabase($conn, $table, $fields, $values, $types);
      if ($res['ok']) {
         $sql = "SELECT * FROM $table";
         $newTable = fetchTable($conn, $sql);
         echo $newTable;
      } else {
         echo json_encode(['ok' => false, 'error' => $res['message']]);
      }