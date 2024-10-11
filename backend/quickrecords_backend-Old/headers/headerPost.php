<?php
 
 /*_________________________________________________
    route: https://phpserver.gofamintpsogba.org/post
    postData example: 
        {  
            "db":"ff",
            "tableName":"EMPLOYEES",
            "deletePrevTable":0,
            "rows":[["Dan", "Blessing", "13"], ["Ben", "Dare", "23"]],
            "insertQuery":"INSERT INTO EMPLOYEES (firstname, lastname, age) VALUES"
          }
         
  ____________________________________________________________
 
    $rootPath = '/home/gofamint/quickrecords.gofamintpsogba.org';
    require_once $rootPath.'/configs/connConfigs.php';


    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        // Read the JSON data from the POST request
        $postData = file_get_contents('php://input');
        $decodedData = json_decode($postData, true);
        
        // Check if decoding was successful
        if(isset($decodedData['tableName']) && isset($decodedData['query']) && isset($decodedData['rows']) && isset($decodedData['db'])){
            // Extract values from decoded data
            $db = $decodedData['db'];
            $tableName = $decodedData['tableName'];
            $query = $decodedData['query'];
            $rows = $decodedData['rows'];
            
            //Connect the right database
            $conn;
            if($db === "admin"){
                $conn =  connectToQuickRecordsAdmin();
            }else if($db === "user"){
                 $conn =  connectToQuickRecords();
            }else{
              echo json_encode(['ok' => false, 'error' => 'Unrecognised database']);
              return;  
            }
        
            $data = postDataToTheDb($conn, $decodedData, $tableName, $insertQuery, $rows);
            echo $data;
        } else {
            echo json_encode([ "ok" => false, "message" => "Invalid or missing parameter."]);
        }
    }else{
         return json_encode(['ok' => false, 'message' => "Method not recognised"]);
    }
        */
?>