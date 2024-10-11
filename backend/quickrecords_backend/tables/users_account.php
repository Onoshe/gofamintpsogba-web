<?php

function createUsersAccount ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            userId	VARCHAR(255) UNIQUE NOT NULL,
            firstname VARCHAR(512),
            lastname	VARCHAR(255),
            email	VARCHAR(255),
            gender	VARCHAR(255),
            title	VARCHAR(25)  COMMENT 'Mr, Mrs, Miss',
            phoneNo	VARCHAR(255),
            secret	VARCHAR(255),
            nonActive	ENUM('1', '0') NOT NULL DEFAULT '0',
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activated',
            deleted INT(1) NOT NULL DEFAULT 0,
            defaultSecret	ENUM('1', '0') NOT NULL DEFAULT '0'  COMMENT 'To check if new user has changed default password',
            companyId INT NOT NULL,
            companyDomain VARCHAR(255) NOT NULL,
            role VARCHAR(255),
            info VARCHAR(1000),
            registeredDate	VARCHAR(255),
            recoveryEmail VARCHAR(255),
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


// admin_usersaccount || demo_usersaccount
//This account is for demo users. TABLE AND DATA TO BE CREATED FOR NEW DATABASE
function insertAdminData (){
    return "INSERT INTO admin_usersaccount (userId, companyId, companyDomain, firstname, lastname, email, secret) VALUES
	('ADMIN@sunday.adegboye', 1, 'ADMIN', 'Sunday', 'Adegboye', 'ozitechstudio@gmail.com', 'abcd1234'),
    ('DEMO@sunday.adegboye', 2, 'DEMO', 'Sunday', 'Adegboye', 'ozitechstudio@gmail.com', 'abcd1234')";
};

function insertDemoData (){
    return "INSERT INTO demo_usersaccount (userId, companyId, companyDomain, firstname, lastname, email, secret) VALUES
	('ADMIN@sunday.adegboye', 1, 'ADMIN', 'Sunday', 'Adegboye', 'ozitechstudio@gmail.com', 'abcd1234'),
    ('DEMO@sunday.adegboye', 2, 'DEMO', 'Sunday', 'Adegboye', 'ozitechstudio@gmail.com', 'abcd1234')";
};

