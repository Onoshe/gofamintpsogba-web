<?php

  function fetchTable($conn, $sql){
    //$sql = "SELECT * FROM practice_db";
    
    $result = $conn->query($sql);
    $data = $result->fetch_all(MYSQLI_ASSOC);
    
    if(isset($data)){
      return json_encode(['ok' => true, 'data' => $data]);   
    }else{
      return json_encode(['ok' => false, 'msg' => "Failed to fetch data"]);
    } 
  };


    