<?php

function createTransactions ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            transactionDate	VARCHAR(255),
            description VARCHAR(512),
            documentNo	VARCHAR(255),
            transactionNo	VARCHAR(255),
            reference	VARCHAR(255),
            entriesCount	INT(11),
            inactive	INT,
            deleted	    INT,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
    ); engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;";
};


function createTransactionDetails ($tableName, $refTableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            transactionID	INT(11),
            entryType ENUM('DR', 'CR') NOT NULL,
            entryDimen ENUM('1', '-1') NOT NULL,
            accountCode	VARCHAR(255),
            accountCodeSub	VARCHAR(255),
            amount	DECIMAL,
            quantity	FLOAT,
            unitPrice	FLOAT,
            voucher     VARCHAR(255) COMMENT 'This can be Payment, Receipt, Journal, etc',
            inactive	INT,
            deleted	    INT,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id),
            FOREIGN KEY (transactionID) REFERENCES $refTableName(id)
    ); engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;";
};