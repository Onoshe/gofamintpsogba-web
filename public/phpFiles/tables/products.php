<?php

function createCoaStructure ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            productName	VARCHAR(255),
            productCode	VARCHAR(255),
            description	VARCHAR(512),
            category	VARCHAR(50),
            inactive	INT,
            deleted	    INT,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id),
    ); engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;";
};

function insertDataCoaStructure ($tableName){
    return "INSERT INTO $tableName (productName, productCode, description, category, createdBy, updatedBy) VALUES
	('Time Attendance Machine', 'OP0001', 'Fingerprint Time Attendance Clock Machine', 'Office Product', 'DEMO', 'DEMO'),
	('Mprinter', 'OP0002', 'Mobile Bluetooth Xprinter Printer', 'Office Product', 'DEMO', 'DEMO'),
	('Projector & Laptop Stand', 'OP0003', 'Projector & Laptop Tripod Stand', 'Office Product', 'DEMO', 'DEMO'),
	('TV Shelf ', 'FF0001', 'TV Black Shelf ', 'Furniture', 'DEMO', 'DEMO'),
	('Center Table', 'FF0002', 'Simple Center Table', 'Furniture', 'DEMO', 'DEMO'),
	('Office Chair', 'FF0003', 'Victory R Swivel Office Chair', 'Furniture', 'DEMO', 'DEMO'),
	('Gas Cylinder', 'KC0001', '6KG Gas Cylinder', 'Kitchen', 'DEMO', 'DEMO'),
	('Dry Iron', 'AP0001', '60 Leaves Exercise Book -Stock', 'Appliances', 'DEMO', 'DEMO'),
	('Blender', 'AP0002', '2.5 Litres Blender', 'Appliances', 'DEMO', 'DEMO'),
	('Electric Kettle', 'AP0003', 'Electric Kettle', 'Appliances', 'DEMO', 'DEMO');";
}