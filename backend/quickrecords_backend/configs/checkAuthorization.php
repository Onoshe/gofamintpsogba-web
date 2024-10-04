<?php

function checkAuthorization($expectedToken) {

    // Get the request headers
    $headers = apache_request_headers();

    // Check if the 'Authorization' header is set
    if (isset($headers['Authorization'])) {
        // Extract the token from the header
        $providedToken = trim(str_replace('Bearer', '', $headers['Authorization']));

        //echo json_encode(['ok' => false, 'error' => true, 'msg' =>  "$providedToken, $expectedToken"]);
        //return; 
        // Compare with the expected token
        if ($providedToken === $expectedToken) {
            // Authorization successful
            return true;
        } else {
            // Authorization failed
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => true, 'msg' => 'Authorization failed!']);
            exit();
        }
    } else {
        // 'Authorization' header is not set
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => true, 'msg' => 'Authorization not set!']);
        exit();
    }
}
