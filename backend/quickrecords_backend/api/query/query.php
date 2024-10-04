
<?php

use Masterminds\HTML5\Parser\UTF8Utils;
    
    if($queryType === "FETCH"){   
      $result = $conn->query($query);
      $data = $result->fetch_all(MYSQLI_ASSOC);
      
      echo (json_encode(['ok' => true, 'data' => $data]));

    }else if($queryType === "UPDATE"){
      $stmt = $conn->prepare($query);
      
      if(!$stmt){
         // Handle query preparation error
         return json_encode(['ok' => false, 'error' => "Error preparing query"]);
      }

      $stmt->execute();
      $updatedTable = $conn->query("SELECT * FROM $table") ->fetch_all(MYSQLI_ASSOC);
      $stmt->close();
      echo json_encode(['ok' => true, 'data' => $updatedTable]);
    }else{
      echo json_encode(['ok' => false, 'message' => "Unrecognised query type"]);

    }
    

    