<?php
    function deleteTablesFromDatabase($tables, $tableNames, $conn){

        //Check for invalid table Name
        $deletedTables = "";
        $delTables = "";
        $asTables ="";
        foreach ($tables as $table) {
            if (!array_key_exists($table, $tableNames)) {
                echo json_encode(['ok' => false, 'msg' => "'$table' is an invalid Table name. Operation terminated!"]);
                return;
            }
        }

        // Disable foreign key checks
        $conn->query("SET FOREIGN_KEY_CHECKS = 0");
        foreach ($tables as $table) {
            $sql = "SHOW TABLES LIKE '$tableNames[$table]'";
            $result = $conn->query($sql);
            
            if($result->num_rows > 0){
                $sql = "DROP TABLE IF EXISTS `$tableNames[$table]`";
                if ($conn->query($sql) === TRUE) {
                   $delTables =  "$delTables, $table";
                   $asTables =  "$asTables, $tableNames[$table]";
                } else {
                    echo "Error deleting table $table: " . $conn->error;
                    return;
                }   
            } else {
                echo json_encode(['ok' => false, 'msg' => "Table $table does not exist"]);
                return;
            }

        }
        
        echo json_encode(['ok' => true, 'msg' => "Table [$delTables] as [$asTables] deleted successfully"]);

        // Re-enable foreign key checks
        $conn->query("SET FOREIGN_KEY_CHECKS = 1");        
    }

