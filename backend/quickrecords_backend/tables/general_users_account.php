<?php

function createUsersAccount (){
    return "CREATE TABLE IF NOT EXISTS _users_account (
            id INT(11) NOT NULL AUTO_INCREMENT,
            userId	VARCHAR(255) UNIQUE NOT NULL,
            firstname VARCHAR(512),
            lastname	VARCHAR(255),
            email	VARCHAR(255),
            gender	VARCHAR(255),
            phoneNo	VARCHAR(255),
            secret	VARCHAR(255),
            defaultSecret	ENUM('1', '0') NOT NULL DEFAULT '0'  COMMENT 'To check if new user has changed default password',
            companyId INT NOT NULL,
            companyDomain VARCHAR(255) NOT NULL,
            role VARCHAR(255),
            registeredDate	VARCHAR(255),
            recoveryEmail VARCHAR(255),
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            deleted INT(1) NOT NULL DEFAULT 0,
            appSlug VARCHAR(255),
            emailConfirmed ENUM('1', '0') NOT NULL DEFAULT '0'  COMMENT 'This will be set to 1 if email confirmed',
            resetPassword ENUM('1', '0') NOT NULL DEFAULT '0'  COMMENT 'This will be set to 1 if reset code is sent to user',
            resetPasswordCode VARCHAR(255),
            resetPasswordExpires VARCHAR(255),
            updatedAt VARCHAR(255),
            createdAt VARCHAR(255),
            PRIMARY KEY (id),
            FOREIGN KEY (companyId) REFERENCES _clients (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (companyDomain) REFERENCES _clients(companyDomain) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

//VARCHAR(255) COMMENT 'This can be Payment, Receipt, Journal, etc',
//ALTER TABLE _users_account ADD emailConfirmed ENUM('1', '0') NOT NULL DEFAULT '0'  COMMENT 'This will be set to 1 if email confirmed';



// _users_account is a general account for all clients