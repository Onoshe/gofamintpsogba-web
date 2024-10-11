<?php

    function activateOrDeactivateClient($act, $clientId, $conn){
           
            //Query statement
            $activateClient = "UPDATE _clients SET inactive = '0' WHERE id = $clientId";
            $deActivateClient = "UPDATE _clients SET inactive = '1' WHERE id = $clientId";
            $removeClient = "DELETE FROM _clients WHERE id = $clientId";
            
            // Execute the SQL query
            if ($act === "ACTIVATE" && $conn->query($activateClient) === TRUE) {
                echo json_encode(['ok' => true, 'msg' => "Client with clidentId '$clientId' has been activated successfully"]);
            }else if ($act === "DEACTIVATE" && $conn->query($deActivateClient) === TRUE) {
                echo json_encode(['ok' => true, 'msg' => "Client with clidentId '$clientId' has been deactivated successfully"]);
            }else if ($act === "REMOVE" && $conn->query($removeClient) === TRUE) {
                echo json_encode(['ok' => true, 'msg' => "Client with clidentId '$clientId' has been deleted successfully"]);
            }else {
                echo json_encode(['ok' => false, 'msg' => "Error preparing update query: " . $conn->error]);
            }
        
    }
