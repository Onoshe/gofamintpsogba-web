
<?php

use Masterminds\HTML5\Parser\UTF8Utils;
    require_once __DIR__ . '/../get/utils/fetchTable.php';

    
    function deleteTransactionsDetails($conn, $table,  $whereField, $whereValue, $whereType) {
       //DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';

      try{
        // Build the query
        $query = "DELETE FROM $table WHERE $whereField = ?";
    
        // Prepare the statement
        if ($stmt = $conn->prepare($query)) {
            $params = [];
            $paramTypes = '';
          
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
                throw new Exception("Error in deleting data: " . $stmt->error);
            }
            $stmt->close();
            return ["ok" => true, "message" => "Transaction deleted successful"];
        } else {
            error_log($conn->error);
            throw new Exception("Error preparing statement: " . $conn->error);
        }
    
        } catch (Exception $e) {
            return ["ok" => false, "message" => $e->getMessage()];
        }
    }


    //updateDatabase($conn, $table, $fields, $values, $types, $whereField, $whereValue, $whereType);
    if($act === "DELETE"){
        $res =  deleteTransactionsDetails($conn, $table,  $whereField, $whereValue, $whereType);
        if($res['ok']){
             $sql = "SELECT * FROM $table";
             $newTable = fetchTable($conn, $sql);
             echo $newTable;
        }
     }
 
 
 