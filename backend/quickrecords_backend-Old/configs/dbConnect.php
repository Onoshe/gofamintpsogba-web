<?php

 function getDbConnectionConfigs($servername, $hostname, $password, $dbname){

    // Create connection
    $conn = new mysqli($servername, $hostname, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }else{
        return $conn;
    }
  
  }
