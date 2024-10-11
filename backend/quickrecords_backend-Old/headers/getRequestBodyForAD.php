<?php

    $clientId;
    $isError = false;
    $errorMsg = "";

    if($reqMethod == 'POST' || $reqMethod == 'PATCH') {  
        // Check if decoding was successful
        if(isset($decodedData['clientId'])){
            $clientId = $decodedData['clientId'];
            
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
    