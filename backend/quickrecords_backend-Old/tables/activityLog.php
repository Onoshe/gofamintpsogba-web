<?php

function createActivityLog ($tableName, $refTableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            userId VARCHAR(255) NOT NULL,
            fullName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            companyDomain VARCHAR(255) NOT NULL,
            activity	VARCHAR(255),
            activityDescription	VARCHAR(550),
            activityDate VARCHAR(255),
            createdAt VARCHAR(255),
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            deleted INT(1) NOT NULL DEFAULT 0,
            PRIMARY KEY (id),
            FOREIGN KEY (userId) REFERENCES $refTableName (userId) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

//VARCHAR(255) COMMENT 'This can be Payment, Receipt, Journal, etc',