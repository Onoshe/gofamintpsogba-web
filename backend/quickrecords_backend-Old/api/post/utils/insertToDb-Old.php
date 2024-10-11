
<?php
function insertIntoDatabase($conn, $table, $fields, $values, $types) {
    
    // Build the query
    $fieldPlaceholders = implode(', ', array_map(function($field, $index) { return "?"; }, $fields, array_keys($fields)));
    $query = "INSERT INTO $table (" . implode(', ', $fields) . ") VALUES (" . $fieldPlaceholders . ")";
    
    $exeError = false;

    //return ([ "ok" => true, "message" => "query- $query"]);

    // Prepare the statement
    if ($stmt = $conn->prepare($query)) {
        foreach ($values as $row) {
            $params = [];
            $paramTypes = '';
            foreach ($fields as $field_index => $field) {
                $value = $row[$field_index];
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
            
            

            $stmt->bind_param($paramTypes, ...$params);
            if (!$stmt->execute()) {
                error_log($stmt->error);
                $exeError = true;
                //die('Error executing statement: ' . $stmt->error);
                return ([ "ok" => false, "message" => "Error in posting data"]);
            }
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
