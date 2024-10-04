<?php

function clientsAccount (){

    return "CREATE TABLE IF NOT EXISTS _clients (
            id INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Being Company unique Id or identifyer',
            companyName VARCHAR(512),
            companyDomain VARCHAR(512) UNIQUE NOT NULL COMMENT 'Of type profitableway in profitableway_customers & profitableway@fred.ola and must be in lowercase',
            address	VARCHAR(255),
            email	VARCHAR(255),
            description	TEXT,
            deleted INT(1) NOT NULL DEFAULT 0,
            contactPersonFirstName	VARCHAR(255),
            contactPersonLastName	VARCHAR(255),
            contactPersonPhoneNo	VARCHAR(255),
            contactPersonTitle	VARCHAR(255),
            businessType VARCHAR(255),
            yearEnd VARCHAR(255),
            packagePlan	VARCHAR(255),
            registeredDate	VARCHAR(255),
            subscriptionExpirationDate	VARCHAR(255),
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            updatedAt VARCHAR(255),
            createdAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

//VARCHAR(255) COMMENT 'This can be Payment, Receipt, Journal, etc',  TABLE AND DATA TO BE CREATED FOR NEW DATABASE

function insertDemoData (){
    return "INSERT INTO _clients (companyName, companyDomain, email, description, yearEnd, packagePlan, registeredDate, subscriptionExpirationDate) VALUES
	('Ozitech Studio Technology Admin', 'ADMIN', 'ozitechstudio@gmail.com', 'Admin for Technology company', '31-December', 'PREMIUM', '2024-06-30', '2024-06-29'),
    ('Ozitech Studio Technology', 'DEMO', 'ozitechstudio@gmail.com', 'Technology company', '31-December', 'PREMIUM', '2024-06-30', '2024-06-29');
	";
};
