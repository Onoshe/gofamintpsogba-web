<?php
    //http://localhost/app/server.php/api/fetch?t=_clients&db=developer&s=id,email&c=id&v=1
    
    // Get URL parameters
    $table = isset($_GET['t']) ? htmlspecialchars($_GET['t'], ENT_QUOTES) : '';
    $selectFields = isset($_GET['s']) ? explode(',', $_GET['s']) : [];
    $conditionFields = isset($_GET['c']) ? explode(',', $_GET['c']) : [];
    $conditionValues = isset($_GET['v']) ? explode(',', $_GET['v']) : [];
    $selectClause = "*";
    $whereClause = '';

    // Validate table name
    if (empty($table)) {
        echo json_encode(['ok' => false, 'message' => 'Table name is required']);
        return;
    }

    // Construct the SELECT part of the query
    $selectClause = empty($selectFields) ? '*' : implode(', ', array_map(function($field) {
      return htmlspecialchars($field, ENT_QUOTES);
    }, $selectFields));


    // Construct the WHERE part of the query
    $whereClause = '';
    $params = [];
    if (!empty($conditionFields) && count($conditionFields) == count($conditionValues)) {
        $conditions = [];
        /*foreach ($conditionFields as $index => $field) {
            $conditions[] = htmlspecialchars($field, ENT_QUOTES) . ' = ?';
            $params[] = htmlspecialchars($conditionValues[$index], ENT_QUOTES);
        }*/
        foreach ($conditionFields as $index => $field) {
            $field = htmlspecialchars($field, ENT_QUOTES);
            $value = htmlspecialchars($conditionValues[$index], ENT_QUOTES);
            
            // Check if the value contains a wildcard character
            if (strpos($value, '%') !== false) {
                $conditions[] = "$field LIKE ?";
            } else {
                $conditions[] = "$field = ?";
            }
            
            $params[] = $value;
        }
        $whereClause = ' WHERE ' . implode(' AND ', $conditions);
    }


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