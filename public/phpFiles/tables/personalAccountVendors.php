<?php

function createCustomers ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName 
        (
            id INT(11) NOT NULL AUTO_INCREMENT,
            type	VARCHAR(255),
            title	VARCHAR(255),
            accountCode	VARCHAR(255),
            firstname	VARCHAR(255),
            lastname	VARCHAR(255),
            othernames	VARCHAR(255),
            dob	VARCHAR(255),
            email	VARCHAR(255),
            phoneNo	VARCHAR(255),
            residentialAddress	VARCHAR(512),
            formNo	VARCHAR(255),
            position	VARCHAR(255),
            nextContactPersonName	VARCHAR(255),
            nextContactPersonPhoneNo	VARCHAR(255),
            nextContactPersonEmail	VARCHAR(255),
            companyName	VARCHAR(255),
            companyEmail	VARCHAR(255),
            companyPhoneNo	VARCHAR(255),
            companyAddress	VARCHAR(255),
            businessType	VARCHAR(255),
            region	VARCHAR(255),
            country	VARCHAR(255),
            state	VARCHAR(255),
            zip	VARCHAR(255),
            registeredDate	VARCHAR(255),
            info	TEXT,
            inactive	INT,
            deleted	    INT,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
        ); engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;";
};

function insertDataCustomers ($tableName){
   return "INSERT INTO $tableName (type, title, accountCode, firstname, lastname, othernames, dob, email, phoneNo, residentialAddress, formNo, position, nextContactPersonName, nextContactPersonPhoneNo, nextContactPersonEmail, companyName, companyEmail, companyPhoneNo, companyAddress, businessType, region, country, state, zip, registeredDate, createdBy, updatedBy) VALUES
	('Company', 'Mr', 'V-0001', 'Minna', 'Amigon', 'Nicka', '1985-03-25', 'minna_amigon@yahoo.com', '215-422-8694', '2371 Jerrold Ave', '0001', 'Manager', 'Feltz Printing Service', '215-422-8694', 'fred@gmail.com', 'Teds Ltd', 'tedsLtd@ymail.com', '013547475', 'Montgomery', 'Consultancy', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mrs', 'V-0002', 'Abel', 'Maclead', 'Inouye', '1989-01-12', 'amaclead@gmail.com', '631-677-3675', '37275 St  Rt 17m M', '0002', 'Asst Manager', 'Printing Dimensions', '631-677-3675', 'peter@gmail.com', 'TT Bell Ltd', 'loly@ymail.com', '013547475', 'Suffolk', 'Merchandise', '', 'USA', 'AB', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Mr', 'V-0003', 'Kiley', 'Caldarera', 'Kolmetz', '1995-01-25', 'kiley.caldarera@aol.com', '310-254-3084', '25 E 75th St #69', '0001', 'Srn Manager', 'Chapman, Ross E Esq', '310-254-3084', 'dayo@gmail.com', 'Vics Metal ', 'tedsLtd@ymail.com', '013547475', 'Los Angeles', 'Consultancy', '', 'USA', 'BN', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Mr', 'V-0004', 'Graciela', 'Ruta', 'Fletcher', '1985-01-12', 'gruta@cox.net', '440-579-7763', '98 Connecticut Ave Nw', '0002', 'Deputy Manager', 'Morlong Associates', '440-579-7763', 'paul@gmail.com', 'JF Frameworks Plc', 'loly@ymail.com', '013547475', 'Geauga', 'Merchandise', '', 'USA', 'CA', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mr', 'V-0005', 'Cammy', 'Albares', 'Bette', '1985-03-25', 'calbares@gmail.com', '956-841-7216', '56 E Morehead St', '0001', 'Manager', 'Commercial Press', '956-841-7216', 'azeez@gmail.com', 'Boxstar', 'tedsLtd@ymail.com', '013547475', 'Webb', 'Consultancy', '', 'USA', 'PH', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mrs', 'V-0006', 'Mattie', 'Poquette', 'Veronika', '1989-01-12', 'mattie@aol.com', '602-953-6360', '73 State Road 434 E', '0002', 'Asst Manager', 'Truhlar And Truhlar Attys', '602-953-6360', 'jumia@gmail.com', 'Holywire Plc', 'loly@ymail.com', '013547475', 'Maricopa', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Miss', 'V-0007', 'Meaghan', 'Garufi', 'Willard', '1995-01-25', 'meaghan@hotmail.com', '931-235-7959', '69734 E Carrillo St', '0001', 'Srn Manager', 'King, Christopher A Esq', '931-235-7959', 'prince@gmail.com', 'Pracks Ventures', 'tedsLtd@ymail.com', '013547475', 'Warren', 'Consultancy', '', 'USA', 'AB', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Dr', 'V-0008', 'Gladys', 'Rim', 'Marrier', '1985-01-12', 'gladys.rim@rim.org', '414-377-2880', '322 New Horizon Blvd', '0002', 'Deputy Manager', 'Dorl, James J Esq', '414-377-2880', 'sanni@gmail.com', 'Omentos Africa', 'loly@ymail.com', '013547475', 'Milwaukee', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mr', 'V-0009', 'Yuki', 'Whobrey', 'Amigon', '1985-03-25', 'yuki_whobrey@aol.com', '313-341-4470', '1 State Route 27', '0001', 'Manager', 'Rangoni Of Florence', '313-341-4470', 'bola@gmail.com', 'Yaris Ltd', 'tedsLtd@ymail.com', '013547475', 'Wayne', 'Consultancy', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mrs', 'V-0010', 'Fletcher', 'Flosi', 'Maclead', '1989-01-12', 'fletcher.flosi@yahoo.com', '815-426-5657', '394 Manchester Blvd', '0002', 'Asst Manager', 'Feiner Bros', '815-426-5657', 'george@gmail.com', 'Cruise Associate', 'loly@ymail.com', '013547475', 'Winnebago', 'Merchandise', '', 'USA', 'BN', '+001', '2024-03-31', 'DEMO', 'DEMO');";
}