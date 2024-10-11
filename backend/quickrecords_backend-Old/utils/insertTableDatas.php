<?php

    function insertDataToDbTable($tables, $tableNames, $conn, $insertQueries){
        //Check for invalid table Name
        $insertedTables = "";
        foreach ($tables as $table) {
            if (!array_key_exists($table, $tableNames)) {
                echo json_encode(['ok' => false, 'msg' => "'$table' is an invalid Table name. Operation terminated!"]);
                return;
            }
        }

        foreach ($tables as $table) {
            $tableName = $tableNames[$table];
            $sql = "SHOW TABLES LIKE '$tableName'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0){
                        $deleteQuery = "DELETE FROM $tableName"; //Delete previous data
                        //$sql = "DROP TABLE IF EXISTS $tableName";
                        if ($conn->query($deleteQuery) !== TRUE){
                            echo json_encode(['ok' => false, 'msg' => "Error preparing delete query: " . $conn->error]);
                            return;
                        }
                        // Reset the auto-increment key
                        $resetAutoIncrementQuery = "ALTER TABLE $tableName AUTO_INCREMENT = 1";
                        $conn->query($resetAutoIncrementQuery);
                    
                        // Execute the SQL query
                        if(isset($insertQueries[$table])){
                            $sqlInsert = $insertQueries[$table];
                            if ($conn->query($sqlInsert) === TRUE) {
                                $insertedTables =  "$insertedTables, $tableName";
                            } else {
                                echo json_encode(['ok' => false, 'msg' => "Error preparing insert query: " . $conn->error]);
                            }
                        }else{
                            echo json_encode(['ok' => false, 'msg' => "$table has no insert data"]);
                        }
                        
                }else{ 
                    echo json_encode(['ok' => false, 'msg' => "Table $table as '$tableNames[$table]' does not exist"]);
                }  
        }
        echo json_encode(['ok' => true, 'msg' => "Data inserted in tables [$insertedTables]  successfully"]);
    }
