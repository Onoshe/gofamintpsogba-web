<?php

function createCustomers ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName 
        (
            id INT(11) NOT NULL AUTO_INCREMENT,
            type	VARCHAR(255),
            title	VARCHAR(255),
            accountCode	VARCHAR(255) UNIQUE,
            firstname	VARCHAR(255),
            lastname	VARCHAR(255),
            othernames	VARCHAR(255),
            accountGroup	VARCHAR(255),
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
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            deleted INT(1) NOT NULL DEFAULT 0,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

function insertDataToCustomers ($tableName){
   return "INSERT INTO $tableName (type, title, accountCode, firstname, lastname, othernames, dob, email, phoneNo, residentialAddress, formNo, position, nextContactPersonName, nextContactPersonPhoneNo, nextContactPersonEmail, companyName, companyEmail, companyPhoneNo, companyAddress, businessType, region, country, state, zip, registeredDate, accountGroup, createdBy, updatedBy) VALUES
	('Company', 'Mr', 'V-000001', 'James', 'Butt', 'Geauga', '1985-03-25', 'jbutt@gmail.com', '504-845-1427', '6649 N Blue Gum St', '0001', 'Manager', 'Buckley Miller & Wright', '504-845-1427', 'fred@gmail.com', 'Teds Ltd', 'tedsLtd@ymail.com', '504-845-1427', 'Orleans', 'Consultancy', '', 'USA', 'LG', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Company', 'Mrs', 'V-000002', 'Josephine', 'Darakjy', 'Webb', '1989-01-12', 'josephine_darakjy@darakjy.org', '810-374-9840', '4 B Blue Ridge Blvd', '0002', 'Asst Manager', 'Rousseaux, Michael Esq', '810-374-9840', 'peter@gmail.com', 'TT Bell Ltd', 'loly@ymail.com', '810-374-9840', 'Livingston', 'Merchandise', '', 'USA', 'AB', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Individual', 'Mr', 'V-000003', 'Art', 'Venere', 'Maricopa', '1995-01-25', 'art@venere.org', '856-264-4130', '8 W Cerritos Ave #54', '0001', 'Srn Manager', 'Century Communications', '856-264-4130', 'dayo@gmail.com', 'Vics Metal ', 'tedsLtd@ymail.com', '856-264-4130', 'Gloucester', 'Consultancy', '', 'USA', 'BN', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Individual', 'Mr', 'V-000004', 'Lenna', 'Paprocki', 'Warren', '1985-01-12', 'lpaprocki@hotmail.com', '907-921-2010', '639 Main St', '0002', 'Deputy Manager', 'Bolton, Wilbur Esq', '907-921-2010', 'paul@gmail.com', 'JF Frameworks Plc', 'loly@ymail.com', '907-921-2010', 'Anchorage', 'Merchandise', '', 'USA', 'CA', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Company', 'Mr', 'V-000005', 'Donette', 'Foller', 'Milwaukee', '1985-03-25', 'donette.foller@cox.net', '513-549-4561', '34 Center St', '0001', 'Manager', 'T M Byxbee Company Pc', '513-549-4561', 'azeez@gmail.com', 'Boxstar', 'tedsLtd@ymail.com', '513-549-4561', 'Butler', 'Consultancy', '', 'USA', 'PH', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Company', 'Mrs', 'V-000006', 'Simona', 'Morasca', 'Wayne', '1989-01-12', 'simona@morasca.com', '419-800-6759', '3 Mcauley Dr', '0002', 'Asst Manager', 'Farmers Insurance Group', '419-800-6759', 'jumia@gmail.com', 'Holywire Plc', 'loly@ymail.com', '419-800-6759', 'Ashland', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Individual', 'Miss', 'V-000007', 'Mitsue', 'Tollner', 'Winnebago', '1995-01-25', 'mitsue_tollner@yahoo.com', '773-924-8565', '7 Eads St', '0001', 'Srn Manager', 'Post Box Services Plus', '773-924-8565', 'prince@gmail.com', 'Pracks Ventures', 'tedsLtd@ymail.com', '773-924-8565', 'Cook', 'Consultancy', '', 'USA', 'AB', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Individual', 'Dr', 'V-000008', 'Leota', 'Dilliard', 'Delaware', '1985-01-12', 'leota@hotmail.com', '408-813-1105', '7 W Jackson Blvd', '0002', 'Deputy Manager', 'Sport En Art', '408-813-1105', 'sanni@gmail.com', 'Omentos Africa', 'loly@ymail.com', '408-813-1105', 'Santa Clara', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Company', 'Mr', 'V-000009', 'Sage', 'Wieser', 'Santa Clara', '1985-03-25', 'sage_wieser@cox.net', '605-794-4895', '5 Boston Ave #88', '0001', 'Manager', 'C 4 Network Inc', '605-794-4895', 'bola@gmail.com', 'Yaris Ltd', 'tedsLtd@ymail.com', '605-794-4895', 'Minnehaha', 'Consultancy', '', 'USA', 'LG', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),
    ('Company', 'Mrs', 'V-000010', 'Kris', 'Marrier', 'Dallas', '1989-01-12', 'kris@gmail.com', '410-804-4694', '228 Runamuck Pl #2808', '0002', 'Asst Manager', 'Ingalls, Donald R Esq', '410-804-4694', 'george@gmail.com', 'Cruise Associate', 'loly@ymail.com', '410-804-4694', 'Baltimore City', 'Merchandise', '', 'USA', 'BN', '+001', '2024-03-31', 'MEMBERS', 'DEMO', 'DEMO'),

    ('Company', 'Mrs', 'V-000011', 'Mattie', 'Poquette', 'Veronika', '1989-01-12', 'mattie@aol.com', '602-953-6360', '73 State Road 434 E', '0002', 'Asst Manager', 'Truhlar And Truhlar Attys', '602-953-6360', 'jumia@gmail.com', 'Holywire Plc', 'loly@ymail.com', '013547475', 'Maricopa', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'GENERAL', 'DEMO', 'DEMO'),
    ('Individual', 'Miss', 'V-000012', 'Meaghan', 'Garufi', 'Willard', '1995-01-25', 'meaghan@hotmail.com', '931-235-7959', '69734 E Carrillo St', '0001', 'Srn Manager', 'King, Christopher A Esq', '931-235-7959', 'prince@gmail.com', 'Pracks Ventures', 'tedsLtd@ymail.com', '013547475', 'Warren', 'Consultancy', '', 'USA', 'AB', '+001', '2024-03-31', 'GENERAL', 'DEMO', 'DEMO'),
    ('Individual', 'Dr', 'V-000013', 'Gladys', 'Rim', 'Marrier', '1985-01-12', 'gladys.rim@rim.org', '414-377-2880', '322 New Horizon Blvd', '0002', 'Deputy Manager', 'Dorl, James J Esq', '414-377-2880', 'sanni@gmail.com', 'Omentos Africa', 'loly@ymail.com', '013547475', 'Milwaukee', 'Merchandise', '', 'USA', 'LG', '+001', '2024-03-31', 'GENERAL', 'DEMO', 'DEMO'),
    ('Company', 'Mr', 'V-000014', 'Yuki', 'Whobrey', 'Amigon', '1985-03-25', 'yuki_whobrey@aol.com', '313-341-4470', '1 State Route 27', '0001', 'Manager', 'Rangoni Of Florence', '313-341-4470', 'bola@gmail.com', 'Yaris Ltd', 'tedsLtd@ymail.com', '013547475', 'Wayne', 'Consultancy', '', 'USA', 'LG', '+001', '2024-03-31', 'GENERAL', 'DEMO', 'DEMO'),
    ('Company', 'Mrs', 'V-000015', 'Fletcher', 'Flosi', 'Maclead', '1989-01-12', 'fletcher.flosi@yahoo.com', '815-426-5657', '394 Manchester Blvd', '0002', 'Asst Manager', 'Feiner Bros', '815-426-5657', 'george@gmail.com', 'Cruise Associate', 'loly@ymail.com', '013547475', 'Winnebago', 'Merchandise', '', 'USA', 'BN', '+001', '2024-03-31', 'GENERAL', 'DEMO', 'DEMO');";
}