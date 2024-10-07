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
        require_once 'configs/checkAuthorization.php';
        //require_once 'configs/DotEnvLoader.php';
        require_once 'configs/dbConnect.php';

        use DevCoder\DotEnv;
        // Load environment variables
        (new DotEnv(__DIR__ . '/.env'))->load();
        checkAuthorization(getenv('TOKEN'));
  
        //Connection details
        $servername = getenv('SERVERNAME');  
        $hostname = getenv('USERNAME'); 
        $password = getenv('PASSWORD'); 
        $dbname = getenv('DBNAME'); 
        
        $conn = getDbConnectionConfigs($servername, $hostname, $password, $dbname);

        require_once 'configs/dbTableVilidator.php';

        $url = $_SERVER['REQUEST_URI']; // get the URL
        $method = $_SERVER['REQUEST_METHOD']; // get the request method

        //$base_url = 'http://localhost/app/server.php'; // base URL
        preg_match('/api\/([^.?\/]+)/', $url, $match); //Extract the string after /api
        $req = $match[1];


        dbTableVilidator($method, $conn, $req);

        $routes = [
            'fetch' => ['api/get/fetch.php', 'GET'],
            'show' => ['api/get/show.php', 'GET'],
            'users-account' => ['api/get/fetch-tables/users-account.php', 'GET'],
            'fetch-where' => ['api/get/fetch-others/fetch-where.php', 'GET'],
            'transactions' => ['api/get/transactions/fetch.php', 'GET'],
            'post-user' => ['api/post/post-user.php', 'POST'],
            'post-client' => ['api/post/post-client.php', 'POST'],
            'post-trans' => ['api/post/post-client.php', 'POST'],
            'patch-trans' => ['api/update/update.php', 'PATCH'],
            'delete-trans' => ['api/update/delete-trans.php', 'PATCH'],
            'post-and-retrieve' => ['api/post/post-and-retrieve.php', 'POST'],
            'post-access' => ['api/post/post-general.php', 'POST']
            //'patch' => ['api/update/update.php', 'PATCH'],
            //'query' => ['api/query/query.php', 'PATCH'],
        ];
        //http://localhost/app/server.php/api/post-user

        //echo $req;
        //return;

        //return;

        if (array_key_exists($req, $routes)) {
            if ($routes[$req][1] === $method) {
                if($routes[$req][1] === "GET"){
                    require_once __DIR__ . '/' . $routes[$req][0]; // include the corresponding file
                }else{
                    require_once __DIR__ . '/configs/updateHeader.php';
                    if(!$error)
                        require_once __DIR__ . '/' . $routes[$req][0]; // include the corresponding file
                }
            } else {
                echo json_encode(['ok' => false, 'error' => 'Method not allowed']); // or handle invalid method
            }
        } else {
            echo json_encode(['ok' => false, 'error' => '404 Not Found']); // or handle invalid URL
        }

        $conn->close();