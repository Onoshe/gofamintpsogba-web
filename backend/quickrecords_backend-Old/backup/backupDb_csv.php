p<?php
function backup_mysql_to_csv($host, $username, $password, $database, $mail) {
    // Create a new connection to the database
    $mysqli = new mysqli($host, $username, $password, $database);
    
    // Define the backup directory and create a folder with the current date
    $date = date('Ymd_His');
    $backup_dir = "backup/backup_$date";

    // Check if connection was successful
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    // Check if the backup directory exists, if not, create it
    if (!is_dir($backup_dir)) {
        mkdir($backup_dir, 0777, true); // Create the directory recursively with full write permissions
    }

    // Get the list of tables in the database
    $tables = $mysqli->query("SHOW TABLES");
    
     // Initialize an array to hold the names of backed-up tables
     $backupTables = array();
     
    // Loop through each table
    while ($row = $tables->fetch_array()) {
        $table = $row[0];  // Table name
        
        // Create a CSV file path for the table
        $backup_file = $backup_dir . '/' . $table . '.csv';
        
        // Open the CSV file for writing
        $file = fopen($backup_file, 'w');
        
        // Fetch the column names from the table
        $columns_query = $mysqli->query("SHOW COLUMNS FROM $table");
        $columns = [];
        while ($col = $columns_query->fetch_array()) {
            $columns[] = $col['Field'];
        }
        // Write the column headers to the CSV file
        fputcsv($file, $columns);
        
        // Fetch all rows from the table
        $result = $mysqli->query("SELECT * FROM $table");
        while ($data = $result->fetch_assoc()) {
            // Write each row to the CSV file
            fputcsv($file, $data);
        }
        
        // Close the file
        fclose($file);

        // Add the table name to the $backupTables array
        array_push($backupTables, $table); 
    }
   
    // Check and clean up old backup directories if there are more than 5
    clean_old_backups('backup', 5);

    
    //Send Mail
    $backupTablesStr = "";
    $backupTablesCopy = $backupTables;

    foreach ($backupTablesCopy as $index => $value) {
        // Append the index (starting from 1) and the value to the result string
        $backupTablesStr .= "<div style='color:maroon'>".($index + 1) . ". " . $value . "<div>";
    }

    $mail->setFrom('no-reply@gofamintpsogba.org');
    $mail->addAddress('ozitechstudio@gmail.com');
    $mail->isHTML(true);  
    $mail->Subject = 'QuickRecords Database Backup Successful';
    $mail->Body = "<html><body><div>
            <p style='color:blue'><em>Back up Successful.</em></p> 
            <p>Backup in csv done on_ $date</p>
            <p>Back up tables:</p>
            <div>$backupTablesStr</div>
        </div></body></html>";
    !$mail->send();

    // Return a JSON response with the list of tables that were backed up
    echo json_encode(['ok' => true, 'msg' => "Back up successful. Backup in csv done at_ $date", 'backupTables'=> $backupTables]);

    // Close the MySQL connection
    $mysqli->close();
}

function clean_old_backups($backup_root_dir, $max_backups) {
    // Get all directories in the backup root folder
    $backup_dirs = array_filter(glob($backup_root_dir . '/*'), 'is_dir');
    
    // Sort directories by their creation time (based on the folder name, as it contains the date)
    usort($backup_dirs, function($a, $b) {
        return filemtime($a) - filemtime($b); // Oldest first
    });

    // If the number of backup directories exceeds the allowed number
    if (count($backup_dirs) > $max_backups) {
        $dirs_to_delete = array_slice($backup_dirs, 0, count($backup_dirs) - $max_backups); // Get directories to delete

        // Loop through each directory and delete it
        foreach ($dirs_to_delete as $dir) {
            delete_directory($dir);
        }
    }
}

function delete_directory($dir) {
    // Recursively delete files and folders in the directory
    if (!is_dir($dir)) return;
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item == '.' || $item == '..') continue;
        $path = $dir . '/' . $item;
        if (is_dir($path)) {
            delete_directory($path); // Recursively delete subdirectories
        } else {
            unlink($path); // Delete file
        }
    }
    rmdir($dir); // Finally, delete the main directory
}
