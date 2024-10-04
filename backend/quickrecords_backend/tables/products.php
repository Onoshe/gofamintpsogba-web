<?php

function createProducts ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            productName	VARCHAR(255),
            productCode	VARCHAR(255),
            description	VARCHAR(512),
            category	VARCHAR(50),
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            deleted INT(1) NOT NULL DEFAULT 0,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

function insertDataToProducts ($tableName){
    return "INSERT INTO $tableName (productName, productCode, description, category, createdBy, updatedBy) VALUES
	('Carbonated drinks', 'CAD0001', 'Varities of Carbonated drinks', 'Grocery', 'DEMO', 'DEMO'),
	('Wine', 'WIN0001', 'Non achoholic America Red Wine', 'Grocery', 'DEMO', 'DEMO'),
	('Body cream', 'BDC0001', 'Body cream', 'Grocery', 'DEMO', 'DEMO'),
	('TV Shelf', 'TVS0001', 'TV Black Shelf ', 'Furnitures', 'DEMO', 'DEMO'),
	('Center Table', 'CNT0001', 'Simple Center Table', 'Furnitures', 'DEMO', 'DEMO'),
	('Office Chair', 'OFC0001', 'Victory R Swivel Office Chair', 'Furnitures', 'DEMO', 'DEMO'),
    ('Executive Office Chair', 'OFC0002', 'Victory L Swivel Office Chair', 'Furnitures', 'DEMO', 'DEMO'),
	('Dry Iron', 'DRI0001', '60 Leaves Exercise Book -Stock', 'Appliances', 'DEMO', 'DEMO'),
	('Blender', 'BLE0001', '2.5 Litres Blender', 'Appliances', 'DEMO', 'DEMO'),
	('Electric Kettle', 'ELK0001', 'Electric Kettle', 'Appliances', 'DEMO', 'DEMO');";
}
