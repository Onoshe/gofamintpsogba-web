<?php

function createTransactions ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            transactionDate	VARCHAR(255),
            description VARCHAR(512),
            reference	VARCHAR(255),
            amount	DECIMAL(25, 2),
            postingPlat	VARCHAR(50),
            accountDr	VARCHAR(255),
            accountCr	VARCHAR(255),
            entriesCount	INT(11),
            inactive	INT,
            deleted INT(1) NOT NULL DEFAULT 0,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};
//NB: TransactionNo is the id which will be padded with 0 for 7-digits.


function createTransactionDetails ($tableName, $refTableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            transactionID	INT(11),
            entryType ENUM('DR', 'CR') NOT NULL,
            entryDimen INT(1) NOT NULL,
            accountCode	VARCHAR(255),
            accountCodeSub	VARCHAR(255),
            accountCodeSubAcct VARCHAR(255) COMMENT 'Sub account Name, eg Customers, Vendors, Products',
            amount	DECIMAL(25, 2),
            quantity	FLOAT,
            unitPrice	FLOAT,
            dueDate INT(11),
            voucher     VARCHAR(255) COMMENT 'This can be Payment, Receipt, Journal, etc',
            doubleEntryId VARCHAR(255) COMMENT 'Unique code to identy double entry, eg in cost of sale',
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activated',
            deleted INT(1) NOT NULL DEFAULT 0,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id),
            FOREIGN KEY (transactionID) REFERENCES $refTableName(id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

//NB: DocumentNo is the id which will be padded with 0 for 7-digits.
//AccountCodeSubAcct is necessary in other to know which account the accountCodeSub relates. AccountCodeSub is an id of either personal or product acct