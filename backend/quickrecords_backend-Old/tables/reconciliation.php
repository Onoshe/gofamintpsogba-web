<?php

function createReconciliation ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            reconDate	VARCHAR(255),
            description VARCHAR(512),
            reconAcctId VARCHAR(255),
            reconAcctClass VARCHAR(255),
            reconAcctTypeCode VARCHAR(255),
            name VARCHAR(500),
            slug VARCHAR(500),
            reconAcctOpeningBal	DECIMAL(25, 2),
            reconAcctEndingBal	DECIMAL(25, 2),
            statementOpeningBal	DECIMAL(25, 2),
            statementEndingBal	DECIMAL(25, 2),
            reconDifference	DECIMAL(25, 2),
            reconOk VARCHAR(255),
            reconBy VARCHAR(255),
            text1 TEXT,
            text2 TEXT,
            ref	VARCHAR(255),
            ref1	VARCHAR(255),
            ref2	VARCHAR(255),
            ref3	VARCHAR(255),
            ref4	VARCHAR(255),
            inactive	INT,
            deleted INT(1) NOT NULL DEFAULT 0,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};
