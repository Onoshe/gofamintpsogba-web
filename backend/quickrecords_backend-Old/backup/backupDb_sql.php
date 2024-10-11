<?php
function backupDatabase($host, $username, $password, $database, $backup_dir){

    $date = date('Ymd_His');
    $backup_file = $backup_dir.'/'.$database.'_backup_'.$date.'.sql';

    $command = "mysqldump --host={$host} --user={$username} --passwprd={$password} {$database} > {$backup_file} 2>&1";

    $output = [];
    $result = 0;

    exec($command, $output, $result);

    if($result === 0){
        echo "Backup successful! The backup file is located at: $backup_file";
    }else{
        echo "Backup failed! Error output:\n";
        print_r($output);
    }
}
