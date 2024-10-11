<?php
//"http://localhost/app/server.php/api/users-account?t=demo_usersaccount"

// Function to fetch all table names matching the pattern
function getTables($conn) {
    $tables = [];
    $result = $conn->query("SHOW TABLES");
    if ($result) {
        while ($row = $result->fetch_array()) {
            $tableName = $row[0];
            if (preg_match('/_usersaccount$/', $tableName)) {
                $tables[] = $tableName;
            }
        }
    }
    return $tables;
}

// Function to fetch data from a table
function getTableData($conn, $tableName) {
    $data = [];
    $result = $conn->query("SELECT * FROM `$tableName`");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

// Fetch all tables matching the pattern
$tables = getTables($conn);

// Fetch data for each table and format the response
$response = [];
foreach ($tables as $table) {
    // Remove the "_usersaccount" suffix to get the key name
    $key = str_replace('_usersaccount', '', $table);
    $response[$key] = getTableData($conn, $table);
}

echo json_encode(['ok' => true, 'data' => $response]);

