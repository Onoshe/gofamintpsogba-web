<?php

function insertAndRetrieveRow($conn, $table, $fields, $values, $types) {
    try {
        $insertedRows = [];

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
                        case 'DECIMAL':
                        case 'FLOAT':
                            $paramTypes .= 'd';
                            $params[] = (float) $value;
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

                // Store the last inserted ID
                $insertedRows[] = $conn->insert_id;
            }
            $stmt->close();

            // Retrieve the inserted rows
            if (!empty($insertedRows)) {
                $insertedRows = implode(', ', $insertedRows);
                $selectQuery = "SELECT * FROM $table WHERE id IN ($insertedRows)";
                $result = $conn->query($selectQuery);

                if ($result) {
                    $fetchedRows = $result->fetch_all(MYSQLI_ASSOC);
                    return ["ok" => true, "message" => "Posting successful","ids" => $insertedRows, "data" => $fetchedRows];
                } else {
                    throw new Exception("Error retrieving inserted data: " . $conn->error);
                }
            } else {
                throw new Exception("No rows inserted.");
            }
        } else {
            error_log($conn->error);
            throw new Exception("Error preparing statement: " . $conn->error);
        }
    } catch (Exception $e) {
        return ["ok" => false, "message" => $e->getMessage()];
    }
}
