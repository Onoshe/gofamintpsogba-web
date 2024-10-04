<?php

    $tables;
    $isError = false;
    $errorMsg = "";

    if($reqMethod == 'POST' || $reqMethod == 'PATCH') {  
        // Check if decoding was successful
        if(isset($decodedData['tables'])){
            if($decodedData['tables']){
                $tables = array_map(function($table) {
                    return htmlspecialchars($table, ENT_QUOTES);
                }, $decodedData['tables']);
            }else{
                //When tables = []. This is the case for creating client tables
                $tables = $newClientTables;
            }
            

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
    