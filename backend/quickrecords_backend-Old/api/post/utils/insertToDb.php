
<?php
function insertIntoDatabase($conn, $table, $fields, $values, $types) {
    try {
        // Build the query
        $fieldPlaceholders = implode(', ', array_fill(0, count($fields), '?'));
        $query = "INSERT INTO $table (" . implode(', ', $fields) . ") VALUES (" . $fieldPlaceholders . ")";

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
                    throw new Exception("Error in posting data: " . $stmt->error);
                }
            }
            $stmt->close();
            return ["ok" => true, "message" => "Posting successful"];
        } else {
            error_log($conn->error);
            throw new Exception("Error preparing statement: " . $conn->error);
        }
    } catch (Exception $e) {
        return ["ok" => false, "message" => $e->getMessage()];
    }
}
