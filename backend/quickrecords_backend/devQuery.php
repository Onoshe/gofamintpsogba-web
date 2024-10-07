<?php
          header("Access-Control-Allow-Origin: *");
          header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
          header("Access-Control-Allow-Headers: Content-Type, Authorization");
          
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            http_response_code(204);
            exit();
        }

        require_once 'configs/DotEnvLoader.php';
        require_once 'configs/dbConnect.php';

        use DevCoder\DotEnv;
        // Load environment variables
        (new DotEnv(__DIR__ . '/.env'))->load();
    
        //Connection details
        $servername = getenv('SERVERNAME');  
        $hostname = getenv('USERNAME'); 
        $password = getenv('PASSWORD'); 
        $dbname = getenv('DBNAME'); 
        
        $conn = getDbConnectionConfigs($servername, $hostname, $password, $dbname);

        $url = $_SERVER['REQUEST_URI']; // get the URL
        $method = $_SERVER['REQUEST_METHOD']; // get the request method
        $postData = file_get_contents('php://input');
        $decodedData = json_decode($postData, true);



        $routes = [
            'BACKUP_SENDMAIL' => 'devQuery/backupAndSendMail.php',
             'SENDMAIL' => 'devQuery/sendMail.php'
        ];


    if ($method === 'POST') {
        if(isset($decodedData['act']) && $decodedData['act'] === "BACKUP_DB"){
            //Backup database
            //PHP Mail
            require_once 'sendMail/configs.php';
            $username_mail = getenv('USERNAME_PHPMAIL');
            $password_mail = getenv('PASSWORD_PHPMAIL');
            $mail = getMailConfigs($username_mail, $password_mail);

            require_once 'backup/backupDb_csv.php';
            backup_mysql_to_csv($servername, $hostname, $password, $dbname, $mail);
            //backupDatabase($servername, $hostname, $password, $dbname, $backup_dir);
        }else if(isset($decodedData['route'])){
            if(array_key_exists($decodedData['route'], $routes)){
                $route = $routes[$decodedData['route']];
                
                require_once 'sendMail/configs.php';
                $username_mail = getenv('USERNAME_PHPMAIL');
                $password_mail = getenv('PASSWORD_PHPMAIL');
                $mail = getMailConfigs($username_mail, $password_mail);
                
                 require_once __DIR__ . '/' . $route;
            }else{
                echo json_encode(array('ok' => false, 'msg' => "Route not recognised"));
            }            
            

        }else if(isset($decodedData['sendMail']) && $decodedData['sendMail'] === "TEST"){
            require_once 'sendMail/configs.php';
            $username_mail = getenv('USERNAME_PHPMAIL');
            $password_mail = getenv('PASSWORD_PHPMAIL');
            $mail = getMailConfigs($username_mail, $password_mail);

            

        }else{
            //$sql = $_POST['query'];
            $sql = $decodedData['query'];

            // Prepare and bind
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                echo json_encode(array('error' => "Error: " . $conn->error));
                exit;
            }

            // Execute the query
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                if ($result) {
                    $data = array();
                    while ($row = $result->fetch_assoc()) {
                        $data[] = $row;
                    }
                    echo json_encode($data);
                } else {
                    echo json_encode(array('success' => "Query executed successfully"));
                }
            } else {
                echo json_encode(array('error' => "Error: " . $stmt->error));
            }

            $stmt->close();
        }
    } else {
        echo json_encode(array('error' => "Invalid request method", 'ok'=> false));
    }

    $conn->close();
