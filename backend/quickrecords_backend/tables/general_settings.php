<?php

/**************************** GENERAL SETTINGS ******************************
 * General settings ( _settings ) is for settings relating to all the clients
 * 
 */

function createSettings (){
    return "CREATE TABLE IF NOT EXISTS _settings (
            id INT(11) NOT NULL AUTO_INCREMENT,
            name	VARCHAR(550),
            description TEXT,
            slug VARCHAR(512),
            number1 INT,
            number2 INT,
            number3 INT,
            smallText1 VARCHAR(255),
            smallText2 VARCHAR(255),
            smallText3 VARCHAR(255),
            medText1 VARCHAR(1500),
            medText2 VARCHAR(1500),
            medText3 VARCHAR(1500),
            text1 TEXT,
            text2 TEXT,
            text3 TEXT,
            largeText1 MEDIUMBLOB, 
            largeText2 MEDIUMBLOB,
            largeText3 MEDIUMBLOB,
            createdBy VARCHAR(255),
            createdAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

$insertQuery = "INSERT INTO `_settings` (`name`, `slug`, `description`, `smallText1`, `smallText2`, `smallText3`, `number1`, `number2`, `number3`) 
        VALUES ('No of Users', 'no-of-package-users', 'Number of users for each package. There are 3 packages- Basic, Pro & Premium and no of users are 5, 10 & 20 respectively', 
                'BASIC', 'PRO', 'PREMIUM', '5', '10', '25')";
