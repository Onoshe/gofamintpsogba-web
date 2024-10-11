<?php   
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        
        /* HTTP_ORIGIN SHOWING " "
        // List of allowed origins
        $allowed_origins = [
            'http://localhost:3000',
            'http://example.com',
            'http://another-example.com',
            'https://quick-records.vercel.app'
        ];

        // Get the origin of the incoming request
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        // Check if the origin is in the allowed origins list
        if (in_array($origin, $allowed_origins)) {
            // Set CORS headers to allow the origin
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
        } else {
            // Optionally, you can send a 403 Forbidden response if the origin is not allowed
            header("HTTP/1.1 403 Forbidden");
            exit;
        }*/

         

        // Read the JSON data from the POST request
        $reqMethod = $_SERVER['REQUEST_METHOD'];
        $postData = file_get_contents('php://input');
        $decodedData = json_decode($postData, true);

        // Handle preflight requests
        if ($reqMethod == 'OPTIONS') {
            http_response_code(204);
            exit();
        }

          
        //echo json_encode(['ok' => false, 'error' =>   $postData ]);
        //return;  

        require_once 'configs/DotEnvLoader.php';
        require_once 'configs/checkAuthorization.php';
        use DevCoder\DotEnv;
        // Load environment variables
        (new DotEnv(__DIR__ . '/.env'))->load();
        checkAuthorization(getenv('TOKEN'));

        //Connection details
        $servername = getenv('SERVERNAME');  
        $hostname = getenv('USERNAME'); 
        $password = getenv('PASSWORD'); 
        $dbname = getenv('DBNAME'); 
        

        require_once 'headers/getRequestBodyBase.php'; //takes $decodedData and extract: $act, $domain

        //echo json_encode(['ok' => false, 'msg' => [$domain]]);
        //return;
        require_once 'configs/connectToDb.php'; //It has to be under in order to get the connection details

        require_once 'tables/coaStructure.php';
        require_once 'tables/chartOfAccount.php';
        require_once 'tables/products.php';
        require_once 'tables/personalAccountCustomers.php';
        require_once 'tables/personalAccountVendors.php';
        require_once 'tables/users_account.php';
        require_once 'tables/activityLog.php';
        require_once 'tables/transactions.php';
        require_once 'tables/settings.php';
        require_once 'tables/reconciliation.php';
        require_once 'utils/createTables.php';
        require_once 'utils/insertNewClientAndCreateTables.php';
        require_once 'utils/deleteTables.php';
        require_once 'utils/insertTableDatas.php';
        require_once 'utils/activateOrDeactivateClient.php';
        require_once 'tables/_indexTables.php'; // It takes $domain and return: $tableNames, $createQueries, $insertQueries, $newClientTables
            
        
        
        //insertDataToDbTable function etc in utils/ 
        if($act === "CREATE"){
             require_once 'headers/getRequestBodyForCID.php';   //extract $tables
             createTablesInDb($tables, $tableNames, $conn, $createQueries);
        }else if($act === "INSERT"){
            require_once 'headers/getRequestBodyForCID.php';
            insertDataToDbTable($tables, $tableNames, $conn, $insertQueries);
        }else if($act === "INSERT_NEW_CLIENT"){
            $table = isset($decodedData['table']) ? htmlspecialchars($decodedData['table']) : '';
            //echo json_encode(['ok' => false, 'tabels' => $table, 'tableNames' => $insertQueries]);
            insertNewClientAndCreateTables($table, $tableNames, $conn,   $insertQueries, $createQueries, $domain);
        }else if($act === "DROP"){
            require_once 'headers/getRequestBodyForCID.php';
            deleteTablesFromDatabase($tables, $tableNames, $conn);
        }else if($act === "ACTIVATE"){
            require_once 'headers/getRequestBodyForAD.php';
            activateOrDeactivateClient($act, $clientId, $conn);
        }else if($act === "DEACTIVATE"){
            require_once 'headers/getRequestBodyForAD.php';
            activateOrDeactivateClient($act, $clientId, $conn);
        }else if($act === "REMOVE"){
            require_once 'headers/getRequestBodyForAD.php';
            activateOrDeactivateClient($act, $clientId, $conn);
        }else if($act === "CREATECLIENT"){
            require_once 'headers/getRequestBodyForAD.php';
            //activateOrDeactivateClient($act, $clientId, $conn);
        }else if($act === "DROPCLIENT"){
            require_once 'headers/getRequestBodyForAD.php';
            //activateOrDeactivateClient($act, $clientId, $conn);
        }else if($act === "BACKUP"){
            echo "Backup in progress";
        }else{
            echo json_encode(['ok' => false, 'msg' => "Unrecognised action"]);
        }
        
        $conn->close();