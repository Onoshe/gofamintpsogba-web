<?php
    //http://localhost/app/server.php/api/fetch-where?t=_settingsbasic&s=*&w=
    
    // Get URL parameters
    $table = isset($_GET['t']) ? htmlspecialchars($_GET['t'], ENT_QUOTES) : '';
    $selectFields = isset($_GET['s']) ? explode(',', $_GET['s']) : [];
    $selectClause = "*";
    $whereClause = isset($_GET['w']) ? htmlspecialchars($_GET['w'], ENT_QUOTES) : '';
    

    // Validate table name
    if (empty($table)) {
        echo json_encode(['ok' => false, 'message' => 'Table name is required']);
        return;
    }

    // Construct the SELECT part of the query
    $selectClause = empty($selectFields) ? '*' : implode(', ', array_map(function($field) {
      return htmlspecialchars($field, ENT_QUOTES);
    }, $selectFields));


    // Build the final query
    $query = "SELECT $selectClause FROM $table $whereClause";

     // Prepare and execute the query
     if ($stmt = $conn->prepare($query)) {
       if (!empty($params)) {
           $types = str_repeat('s', count($params));
           $stmt->bind_param($types, ...$params);
       }
          $stmt->execute();
          $result = $stmt->get_result();
          $data = $result->fetch_all(MYSQLI_ASSOC);
          $stmt->close();

          echo json_encode(['ok' => true, 'data' => $data]);
      } else {
          echo json_encode(['ok' => false, 'message' => 'Error preparing query']);
      }