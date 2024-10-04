<?php
function getCreateTableFunction($tableName) {
    // Map table name patterns to functions
    $tablePatterns = [
        'users' => 'createUsersTable',
        'orders' => 'createOrdersTable'
        // Add more mappings as needed
    ];

    // Determine which function to call based on table name pattern
    foreach ($tablePatterns as $pattern => $functionName) {
        if (strpos($tableName, $pattern) !== false) {
            return $functionName;
        }
    }

    return null; // Return null if no matching function is found
 }




function createTables($conn, $tableNames) {
    include 'table_creation_functions.php'; // Include file with table creation functions

    foreach ($tableNames as $tableName) {
        $createFunction = getCreateTableFunction($tableName);
        if ($createFunction) {
            $sql = $createFunction($tableName);
            if ($conn->query($sql) === TRUE) {
                echo "Table $tableName created successfully.\n";
            } else {
                echo "Error creating table $tableName: " . $conn->error . "\n";
            }
        } else {
            echo "No function found to create table $tableName.\n";
        }
    }
}

// Example usage
$tableNames = ['demo_users', 'frank_orders', 'tin_users'];
createTables($conn, $tableNames);

