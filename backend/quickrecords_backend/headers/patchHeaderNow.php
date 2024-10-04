<?php
    $conn = getDbConnectionConfigs($servername, $hostname, $password, $dbname);
    

    $db ="";
    $tables="";
    $act="";
    $domain="";
    $clientId = "";
    $isError = false;
    $errorMsg = "";
    
    if($reqMethod == 'POST' || $reqMethod == 'PATCH') {  

        // Check if decoding was successful
        if(isset($decodedData['db']) && isset($decodedData['act']) && isset($decodedData['domain'])){
            //  Extract values from decoded data
            $db = $decodedData['db'];
            $act = $decodedData['act'];
            $domain = $decodedData['domain'];
            
            if($act === "CREATE" || $act === "INSERT"  || $act === "DROP"){
                if(isset($decodedData['tables'])){
                    $tables = $decodedData['tables'];    
                }else{
                    $isError = true;
                    $errorMsg = "Missing params- tables.";
                    return;    
                }
                
            }else if($act === "ACTIVATE" || $act === "DEACTIVATE"){
                if(isset($decodedData['clientId'])){
                    $clientId = $decodedData['clientId'];
                }else{
                    $isError = true;
                    $errorMsg = "Missing params- clientId";
                    return;    
                }
            }else{
                $isError = true;
                $errorMsg = "Invalid  act";
                return;                
            }

            //Connect the right database
            if($db === "localDb"){
                //$conn =  getDbConnectionConfigs();
            }else {
                $isError = true;
              $errorMsg = 'Unrecognised database';
              return;  
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
    