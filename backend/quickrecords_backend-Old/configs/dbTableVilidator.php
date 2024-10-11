<?php
/**
 * CHECK IF TABLE EXIST IN DATABASE
 */

 
 function dbTableVilidator($method, $conn, $route) {

    // Prepare the query
    $sqlTableTest = "";
    $tableName = "";

    if($method === 'GET') {
        // Get URL parameters
        $tableIn = isset($_GET['t']) ? htmlspecialchars($_GET['t'], ENT_QUOTES) : '';
        $domainIn = isset($_GET['d']) ? htmlspecialchars($_GET['d'], ENT_QUOTES) : '';
        
        if($route === "transactions"){
            if(empty($domainIn)) {
                http_response_code(401);
                echo json_encode(['ok' => false, 'error' => true, 'message' => 'Domain name is required']);
                exit();
            }
        }else{
            // Validate table name
            if (empty($tableIn)) {
                http_response_code(401);
                echo json_encode(['ok' => false, 'error' => true, 'message' => 'Table name is required']);
                exit();
            }else{
                $sqlTableTest = "SHOW TABLES LIKE '$tableIn'";
                $testResult = $conn->query($sqlTableTest);
                // Check if table exists
                if ($testResult && $testResult->num_rows > 0) {
                    return true; 
                }else{
                    http_response_code(401);
                    echo json_encode(['ok' => false, 'error' => true, 'message' => "Table '$tableName' does not exists."]);
                    exit();
                }
            }
        }

    }else if($method === 'POST' || $method === 'PATCH') {
        // Read the JSON data from the POST request
        $postDataIn = file_get_contents('php://input');
        $requestBodyIn = json_decode($postDataIn, true);

        // Check if decoding was successful
        if(isset($requestBodyIn['table'])){

            // Extract the table, fields, values, types, and act from the request body
            $tableIn = htmlspecialchars($requestBodyIn['table'], ENT_QUOTES);

            // Type casting
            $tableIn = (string) $tableIn;
            $sqlTableTest = "SHOW TABLES LIKE '$tableIn'";
            $testResult = $conn->query($sqlTableTest);
            if ($testResult && $testResult->num_rows > 0) {
                return true; 
            }else{
                http_response_code(401);
                echo json_encode(['ok' => false, 'error' => true, 'message' => "Table '$tableName' does not exists."]);
                exit();
            }
        }else{
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => true, 'message' => 'Table name is required']);
            exit();
        }
    }
}






