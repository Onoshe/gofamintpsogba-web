<?php

    $act;
    $domain;
    $isError = false;
    $errorMsg = "";

    if(isset($decodedData['act']) && isset($decodedData['domain'])){
        // Extract values from decoded data
        $act = htmlspecialchars($decodedData['act'], ENT_QUOTES);
        //$uppercaseString = strtoupper($decodedData['domain']);
        $domain = htmlspecialchars($decodedData['domain'], ENT_QUOTES);
        
    } else {
        $isError = true;
        $errorMsg = "Invalid or missing parameter.";
        return;
    }

    
    
    if($isError === true){
        echo json_encode(['ok' => false, 'msg' => $errorMsg]);
         exit();  
    }
    