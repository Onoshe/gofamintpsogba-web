<?php

function createSettingsBasic (){
    return "CREATE TABLE IF NOT EXISTS _settingsbasic (
            id INT(11) NOT NULL AUTO_INCREMENT,
            name	VARCHAR(255),
            slug	VARCHAR(255),
            type	VARCHAR(255),
            description VARCHAR(512),
            col1 VARCHAR(255),
            col2 VARCHAR(255),
            col3 VARCHAR(255),
            col4 VARCHAR(255),
            col5 VARCHAR(255),
            col6 VARCHAR(255),
            col7 VARCHAR(255),
            col8 VARCHAR(255),
            col9 VARCHAR(255),
            col10 VARCHAR(255),
            col11 VARCHAR(255),
            col12 VARCHAR(255),
            col13 VARCHAR(255),
            col14 VARCHAR(255),
            col15 VARCHAR(255),
            logtext1 TEXT,
            logtext2 TEXT,
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            deleted INT(1) NOT NULL DEFAULT 0,
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};
