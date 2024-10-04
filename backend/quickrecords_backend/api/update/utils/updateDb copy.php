
<?php
function updateDatabase($conn, $table, $fields, $values, $types, $whereField, $whereValue, $whereType) {

    // Build the query
    $setClause = implode(', ', array_map(function($field) { return "$field = ?"; }, $fields));
    $query = "UPDATE $table SET $setClause WHERE $whereField = ?";

   

    // Prepare the statement
    if ($stmt = $conn->prepare($query)) {
        $params = [];
        $paramTypes = '';

        $exeError=false;

        // Bind the values for SET clause
        foreach ($values as $field_index => $value) {
            $type = $types[$field_index];
            switch ($type) {
                case 'VARCHAR':
                    $paramTypes .= 's';
                    $params[] = (string) $value;
                    break;
                case 'INT':
                    $paramTypes .= 'i';
                    $params[] = (int) $value;
                    break;
                // Add more types as needed
                default:
                    $paramTypes .= 's'; // default to string
                    $params[] = $value;
                    break;
            }
        }
      
        // Bind the value for WHERE clause
        switch ($whereType) {
            case 'VARCHAR':
                $paramTypes .= 's';
                $params[] = (string) $whereValue;
                break;
            case 'INT':
                $paramTypes .= 'i';
                $params[] = (int) $whereValue;
                break;
            // Add more types as needed
            default:
                $paramTypes .= 's'; // default to string
                $params[] = $whereValue;
                break;
        }

        $stmt->bind_param($paramTypes, ...$params);
        if (!$stmt->execute()) {
            error_log($stmt->error);
            $exeError = true;
            //die('Error executing statement: ' . $stmt->error);
            return;
        }
        if(!$exeError){
            return ([ "ok" => true, "message" => "Posting successfull"]);
        }
        $stmt->close();
    } else {
        error_log($conn->error);
        die('Error preparing statement: ' . $conn->error);
    }
}