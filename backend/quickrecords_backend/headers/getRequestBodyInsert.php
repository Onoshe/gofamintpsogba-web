<?php

    $act;
    $table;
    $fields;
    $values;
    $types;
    $isError = false;
    $errorMsg = "";

    if($reqMethod == 'POST' || $reqMethod == 'PATCH') {  
        // Check if decoding was successful:$table, $fields, $values, $types
        if(isset($decodedData['act']) && isset($decodedData['table']) && isset($decodedData['fields']) && isset($decodedData['values']) && isset($decodedData['types'])){
            //$table = $decodedData['table'];

            // Extract the table, fields, values, types, and condition from the request body
            $act = htmlspecialchars($decodedData['act'], ENT_QUOTES);
            $table = htmlspecialchars($decodedData['table'], ENT_QUOTES);
            $fields = array_map('htmlspecialchars', $decodedData['fields'], array_fill(0, count($decodedData['fields']), ENT_QUOTES));
            
            $values = $decodedData['values'];
            $types = $decodedData['types'];

            //$values = $decodedData['values'];
            //$types = $decodedData['types'];
            //$whereField = htmlspecialchars($requestBody['whereField'], ENT_QUOTES);
            //$whereValue = $requestBody['whereValue'];
            //$whereType = $requestBody['whereType'];

            // Type casting
            $act = (string) $act;
            $table = (string) $table;
            $fields = array_map('strval', $fields); //Map the values to string using strval function
            
            
        } else {
            $isError = true;
            $errorMsg = "Invalid or missing parameter.";
            return;
        }

        


    }else{
        $isError = true;
         $errorMsg = "Method not recognised";
         return;
    }

    
    
    if($isError === true){
        echo json_encode(['ok' => false, 'msg' => $errorMsg]);
         exit();  
    }
    