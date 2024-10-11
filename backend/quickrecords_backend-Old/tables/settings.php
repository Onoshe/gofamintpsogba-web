<?php

function createSettings($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            name	VARCHAR(255),
            description VARCHAR(512),
            slug VARCHAR(512),
            number INT,
            smallText VARCHAR(255),
            medText VARCHAR(1500),
            text TEXT,
            largeText MEDIUMBLOB, 
            createdBy VARCHAR(255),
            createdAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

//Settings Table refusing to be auto created on create client. This should manually be created

// Create admin_settings for all settings