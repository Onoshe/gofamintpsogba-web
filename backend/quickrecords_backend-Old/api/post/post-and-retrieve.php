
<?php

use Masterminds\HTML5\Parser\UTF8Utils;

    require_once 'utils/insertAndRetrieveRow.php';
      

      $res = insertAndRetrieveRow($conn, $table, $fields, $values, $types);
      if ($res['ok']) {
         
         echo json_encode($res);
      } else {
         echo json_encode(['ok' => false, 'error' => $res['message']]);
      }