<?php
    function createTablesInDb($tables, $tableNames, $conn, $createQueries){
        
        $createdTables = "";
        $asCreatedTables = "";
        //Check for invalid table Name
        foreach ($tables as $table) {
            if (!array_key_exists($table, $tableNames)) {
                echo json_encode(['ok' => false, 'msg' => "'$table' is an invalid Table name. Operation terminated!"]);
                return;
            }
        }
        //echo json_encode(['tables'=>$tables, 'a'=> $createQueries[$table]]);
        //return;
        foreach ($tables as $table) {
            $sql = "SHOW TABLES LIKE '$tableNames[$table]'";
            $result = $conn->query($sql);
                if ($result->num_rows > 0){
                     echo json_encode(['ok' => true, 'data' => "Table '$table' already exist as '$tableNames[$table]'"]);
                     return;
                }else{ 
                    $result = $conn->query($createQueries[$table]);
                    $createdTables =  "$createdTables, $table";
                    $asCreatedTables =  "$asCreatedTables, $tableNames[$table]";
                }
                //echo json_encode(['ok' => true, 'data' => "Table: '$table' as '$tableNames[$table]'; query: $createQueries[$table]"]);      
        }

        //$resultFetch = $conn->query($sql);
        //$dataRes = $resultFetch->fetch_all(MYSQLI_ASSOC);
        //if(isset($dataRes)){
        //} 


        //Insert chart of account structure data: COASTRUCTURE
        $insertCOASQuery = insertDataCoaStructure($tableNames['COASTRUCTURE']);
        $conn->query($insertCOASQuery);

        echo json_encode(['ok' => true, 'msg' => "Tables [$createdTables] created as [$asCreatedTables]"]);
    }

    

