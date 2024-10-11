<?php


    $sql = "SELECT * FROM practice_db";
    
    $result = $conn->query($sql);
    $data = $result->fetch_all(MYSQLI_ASSOC);
    
    if(isset($data)){
      echo(json_encode(['ok' => true, 'data' => $data]));   
    }else{
        echo(json_encode(['ok' => false, 'msg' => "Failed to fetch data"]));
    } 
     
