<?php
    /******************
     This is to check if table (query- t) exist in the database (db)
     Route example: http://localhost/quickrecords_backend/server.php/api/show?t=demo_usersaccount&s=dtables&db=quickrecords
    
    $dbname - From server.php;
    */


    // Get URL parameters
    $table = isset($_GET['t']) ? htmlspecialchars($_GET['t'], ENT_QUOTES) : '';
    $db = isset($_GET['db']) ? htmlspecialchars($_GET['db'], ENT_QUOTES) : '';
    $show = isset($_GET['s']) ? htmlspecialchars($_GET['s'], ENT_QUOTES) : '';
    //$showTables = isset($_GET['tables']) ? explode(',', $_GET['tables']) : [];


    $queries = [
        'tables' => "SHOW TABLES",
        'dtables' => "SELECT TABLE_NAME, TABLE_ROWS FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$dbname'",
        'databases' => "SHOW DATABASES",
        'query' => "SELECT * FROM $table"
    ];

    // Validate table name
    if (empty($table)) {
        //echo json_encode(['ok' => false, 'message' => 'Table name is required']);
        //return;
    }

     // Prepare and execute the query
     $query = $queries[$show];
     if ($stmt = $conn->prepare($query)) {
          $stmt->execute();
          $result = $stmt->get_result();
          $data = $result->fetch_all(MYSQLI_ASSOC);
          $stmt->close();

          echo json_encode(['ok' => true, 'data' => $data]);
      } else {
          echo json_encode(['ok' => false, 'message' => 'Error preparing query']);
      }