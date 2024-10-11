<?php
   
   $conn = getDbConnectionConfigs($servername, $hostname, $password, $dbname);

    $db;
    $tables;
    $act;
    $domain;

    if($_SERVER['REQUEST_METHOD'] === 'PATCH') {
        // Read the JSON data from the POST request
        $postData = file_get_contents('php://input');
        $decodedData = json_decode($postData, true);
        
         
        // Check if decoding was successful
        if(isset($decodedData['db']) && isset($decodedData['act']) && isset($decodedData['tables']) && isset($decodedData['domain'])){
            // Extract values from decoded data
            $db = $decodedData['db'];
            $act = $decodedData['act'];
            $tables = $decodedData['tables'];
            $domain = $decodedData['domain'];
            
            //Connect the right database
            if($db === "localDb"){
               // $conn =  getDbConnectionConfigs();
            }else {
              echo json_encode(['ok' => false, 'error' => 'Unrecognised database']);
              return;  
            }
            
            
        } else {
            echo json_encode([ "ok" => false, "message" => "Invalid or missing parameter."]);
            return;
        }

    }else{
         return json_encode(['ok' => false, 'message' => "Method not recognised"]);
         
    }
    
   