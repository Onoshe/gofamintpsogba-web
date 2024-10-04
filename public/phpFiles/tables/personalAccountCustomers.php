<?php

function createCoaStructure ($tableName){
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

function insertDataCoaStructure ($tableName){
    return "INSERT INTO $tableName (type, title, accountCode, firstname, lastname, othernames, dob, email, phoneNo, residentialAddress, formNo, position, nextContactPersonName, nextContactPersonPhoneNo, nextContactPersonEmail, companyName, companyEmail, companyPhoneNo, companyAddress, businessType, region, country, state, zip, registeredDate, createdBy, updatedBy) VALUES
	('Company', 'Mr', 'C-0001', 'James', 'Butt', 'Geauga', '1985-03-25', 'jbutt@gmail.com', '504-845-1427', '6649 N Blue Gum St', '0001', 'Manager', 'Buckley Miller & Wright', '504-845-1427', 'fred@gmail.com', 'Teds Ltd', 'tedsLtd@ymail.com', '504-845-1427', 'Orleans', 'Consultancy', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mrs', 'C-0002', 'Josephine', 'Darakjy', 'Webb', '1989-01-12', 'josephine_darakjy@darakjy.org', '810-374-9840', '4 B Blue Ridge Blvd', '0002', 'Asst Manager', 'Rousseaux, Michael Esq', '810-374-9840', 'peter@gmail.com', 'TT Bell Ltd', 'loly@ymail.com', '810-374-9840', 'Livingston', 'Merchandise', '', 'USA', 'AB', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Mr', 'C-0003', 'Art', 'Venere', 'Maricopa', '1995-01-25', 'art@venere.org', '856-264-4130', '8 W Cerritos Ave #54', '0001', 'Srn Manager', 'Century Communications', '856-264-4130', 'dayo@gmail.com', 'Vics Metal ', 'tedsLtd@ymail.com', '856-264-4130', 'Gloucester', 'Consultancy', '', 'USA', 'BN', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Mr', 'C-0004', 'Lenna', 'Paprocki', 'Warren', '1985-01-12', 'lpaprocki@hotmail.com', '907-921-2010', '639 Main St', '0002', 'Deputy Manager', 'Bolton, Wilbur Esq', '907-921-2010', 'paul@gmail.com', 'JF Frameworks Plc', 'loly@ymail.com', '907-921-2010', 'Anchorage', 'Merchandise', '', 'USA', 'CA', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mr', 'C-0005', 'Donette', 'Foller', 'Milwaukee', '1985-03-25', 'donette.foller@cox.net', '513-549-4561', '34 Center St', '0001', 'Manager', 'T M Byxbee Company Pc', '513-549-4561', 'azeez@gmail.com', 'Boxstar', 'tedsLtd@ymail.com', '513-549-4561', 'Butler', 'Consultancy', '', 'USA', 'PH', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mrs', 'C-0006', 'Simona', 'Morasca', 'Wayne', '1989-01-12', 'simona@morasca.com', '419-800-6759', '3 Mcauley Dr', '0002', 'Asst Manager', 'Farmers Insurance Group', '419-800-6759', 'jumia@gmail.com', 'Holywire Plc', 'loly@ymail.com', '419-800-6759', 'Ashland', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Miss', 'C-0007', 'Mitsue', 'Tollner', 'Winnebago', '1995-01-25', 'mitsue_tollner@yahoo.com', '773-924-8565', '7 Eads St', '0001', 'Srn Manager', 'Post Box Services Plus', '773-924-8565', 'prince@gmail.com', 'Pracks Ventures', 'tedsLtd@ymail.com', '773-924-8565', 'Cook', 'Consultancy', '', 'USA', 'AB', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Individual', 'Dr', 'C-0008', 'Leota', 'Dilliard', 'Delaware', '1985-01-12', 'leota@hotmail.com', '408-813-1105', '7 W Jackson Blvd', '0002', 'Deputy Manager', 'Sport En Art', '408-813-1105', 'sanni@gmail.com', 'Omentos Africa', 'loly@ymail.com', '408-813-1105', 'Santa Clara', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mr', 'C-0009', 'Sage', 'Wieser', 'Santa Clara', '1985-03-25', 'sage_wieser@cox.net', '605-794-4895', '5 Boston Ave #88', '0001', 'Manager', 'C 4 Network Inc', '605-794-4895', 'bola@gmail.com', 'Yaris Ltd', 'tedsLtd@ymail.com', '605-794-4895', 'Minnehaha', 'Consultancy', '', 'USA', 'LG', '+001', '2024-03-31', 'DEMO', 'DEMO'),
	('Company', 'Mrs', 'C-0010', 'Kris', 'Marrier', 'Dallas', '1989-01-12', 'kris@gmail.com', '410-804-4694', '228 Runamuck Pl #2808', '0002', 'Asst Manager', 'Ingalls, Donald R Esq', '410-804-4694', 'george@gmail.com', 'Cruise Associate', 'loly@ymail.com', '410-804-4694', 'Baltimore City', 'Merchandise', '', 'USA', 'BN', '+001', '2024-03-31', 'DEMO', 'DEMO');";
};