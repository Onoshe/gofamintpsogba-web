<?php
         header("Access-Control-Allow-Origin: *");
         header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
         header("Access-Control-Allow-Headers: Content-Type, Authorization");                   

        // List of allowed origins
        $allowed_origins = [
            'http://localhost:3000',
            'http://example.com',
            'http://another-example.com'
        ];
        // Get the origin of the request
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        // Check if the origin is in the allowed list
        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: $origin");
        }
        // Set additional headers
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
        }if(isset($decodedData['sendMail']) && $decodedData['sendMail'] === "TEST"){
            require_once 'sendMail/configs.php';
            $username_mail = getenv('USERNAME_PHPMAIL');
            $password_mail = getenv('PASSWORD_PHPMAIL');
            $mail = getMailConfigs($username_mail, $password_mail);


            require_once 'backup/emailBackupFile.php';
            $backup_root_dir = 'backup';
             //Zip the latest file and email
            $zipFile =  zip_latest_backup_folder($backup_root_dir);
            if ($zipFile['ok']) {
                $res = email_backup($zipFile['zipFile'], $mail);
                
                if($res['ok']){
                    // Delete the ZIP file
                    $zipedFile = $zipFile['zipFile'];
                    if (unlink($zipedFile)) {
                        echo json_encode(array('ok' => true, 'msg' => "Mail sent with zip file- $zipedFile deleted"));
                    } else {
                        echo json_encode(array('ok' => true, 'msg' => "Mail sent but unable to delete zip file- $zipedFile"));
                    }
                }else{
                    echo json_encode(array('ok' => false, 'msg' => $res['msg']));
                }
                 
            }else{
                echo json_encode(array('ok' => $zipFile['ok'], 'msg' => $zipFile['msg']));
            }

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
