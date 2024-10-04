<?php

//"name", "description","slug","column1", "updatedAt", "createdAt

function createAdminAccess (){
    return "CREATE TABLE IF NOT EXISTS _access (
            id INT(11) NOT NULL AUTO_INCREMENT,
            name	VARCHAR(255),
            description	VARCHAR(255),
            slug	VARCHAR(255),
            column1 VARCHAR(255),
            column2 VARCHAR(255),
            column3 VARCHAR(255),
            column4 VARCHAR(255),
            column5 VARCHAR(255),
            updatedAt VARCHAR(255),
            createdAt VARCHAR(255),
             PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};



//_access is for addition security login for Admin. TABLE AND DATA TO BE CREATED FOR NEW DATABASE
function insertDemoData (){
    return "INSERT INTO _access (name, description, slug, column1) VALUES
	('Sunday Adegboye', 'Manage client access', 'posting-access', 'abcd1234')";
};

//column1= abcd1234=  $2a$10$M2Oqn3kSbO6wpzEByvcXIuoY4mCixUuOh9RAS3GBA93ltpwev7Rc2