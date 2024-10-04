<?php
    /************************************** 
    {   
        //http://localhost/app/server.php/api/post-user
        "act":"POST",
        "table":"practice_db",
        "fields":["firstname","lastname","email", "gender", "age"],
        "values":[["Fred","Sam", "fred@gmail.com","male", 26], ["Amos","Dayo", "amos@gmail.com","male", 30]],
        "types":["VARCHAR", "VARCHAR","VARCHAR","VARCHAR", "INT"],
        
        //act: UPDATE
        "act":"UPDATE",
        "table":"practice_db",
        "fields":["firstname","age"],
        "values":["Adams", 28]],
        "types":["VARCHAR", "INT"],
        "whereField": "id",
        "whereValue": 2,
        "whereType":"INT"
        } 
   _____________________________________________________ */
    
    $error = false;
    $postData;
    $requestBody;
    $table;
    $fields;
    $values;
    $act;
    $types;
    $whereField;
    $whereValue;
    $whereType;
    $query;
    $queryType;
    $autoClientTables = ""; //CREATE OR DELETE

    if($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PATCH') {
        // Read the JSON data from the POST request
        $postData = file_get_contents('php://input');
        $requestBody = json_decode($postData, true);
            
        // Check if decoding was successful
        if(isset($requestBody['table'])  && isset($requestBody['act'])){
           
                // Extract the table, fields, values, types, and act from the request body
                $table = htmlspecialchars($requestBody['table'], ENT_QUOTES);
                $act = htmlspecialchars($requestBody['act'], ENT_QUOTES);

                // Type casting
                $table = (string) $table;
                $act = (string) $act;

            if($act === "INSERT" || $act === "UPDATE"){ 
                if(isset($requestBody['fields']) && isset($requestBody['values']) && isset($requestBody['types'])){
                    // Extract the table, fields, values, types, and act from the request body
                    $fields = array_map('htmlspecialchars', $requestBody['fields'], array_fill(0, count($requestBody['fields']), ENT_QUOTES));
                    $values = $requestBody['values'];
                    $types = $requestBody['types'];

                    // Type casting
                    $fields = array_map('strval', $fields);
                }
                //UPDATE
                if($act === "UPDATE" && isset($requestBody['whereField']) && isset($requestBody['whereValue']) && isset($requestBody['whereType'])){
                    $whereField = htmlspecialchars($requestBody['whereField'], ENT_QUOTES);
                    $whereValue = $requestBody['whereValue'];
                    //$whereValue = htmlspecialchars($requestBody['whereValue'], ENT_QUOTES);
                    $whereType = htmlspecialchars($requestBody['whereType'], ENT_QUOTES);
                }

                //Auto Client Tables
                if(isset($requestBody['autoClientTables'])){
                    $$autoClientTables = htmlspecialchars($requestBody['autoClientTables'], ENT_QUOTES);
                }
            }

            //DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
            if($act === "DELETE" && isset($requestBody['whereField']) && isset($requestBody['whereValue']) && isset($requestBody['whereType'])){
                    $whereField = htmlspecialchars($requestBody['whereField'], ENT_QUOTES);
                    $whereValue = $requestBody['whereValue'];
                    $whereType = htmlspecialchars($requestBody['whereType'], ENT_QUOTES);
            }

            if($act === "QUERY" && isset($requestBody['query'])){
                $queryType = htmlspecialchars($requestBody['queryType'], ENT_QUOTES);
                $queryType = (string) $queryType;
                $query = $requestBody['query'];
            }

        } else {
            $error = true;
            echo json_encode([ "ok" => false, "message" => "Invalid or missing parameter."]);
            return;
        }
    }else{
        $error = true;
         return json_encode(['ok' => false, 'message' => "Method not recognised"]);    
    }