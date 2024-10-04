<?php

function subscriptions (){

    return "CREATE TABLE IF NOT EXISTS _subscriptions (
            id INT(11) NOT NULL AUTO_INCREMENT,
            companyId VARCHAR(255),
            companyDomain VARCHAR(255),
            subscriptionDate	VARCHAR(255),
            subscriptionAmount	VARCHAR(255),
            subscriptionType	VARCHAR(255),
            paymentRef          VARCHAR(255),
            invoiceNo          VARCHAR(255),
            expiredDate          VARCHAR(255),
            description	      VARCHAR(800),
            deleted INT(1) NOT NULL DEFAULT 0,
            receivingBank	VARCHAR(255),
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            updatedAt VARCHAR(255),
            createdAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

$queriesDemo = `
INSERT INTO _subscriptions(companyId, companyDomain, subscriptionDate, expiredDate, subscriptionAmount, subscriptionType, description, receivingBank,  invoiceNo, paymentRef) 
    VALUES ('DEMO', 'DEMO', '2022-02-28', '2023-02-27', '100000','Pro', 'First subscription', 'GTbank', '1000234', '10349070087676');
INSERT INTO _subscriptions(companyId, companyDomain, subscriptionDate, expiredDate, subscriptionAmount, subscriptionType, description, receivingBank,  invoiceNo, paymentRef) 
    VALUES ('DEMO', 'DEMO', '2023-02-28', '2024-02-27', '100000','Pro', 'Second subscription', 'GTbank', '1000234', '10349070087676');
INSERT INTO _subscriptions(companyId, companyDomain, subscriptionDate, expiredDate, subscriptionAmount, subscriptionType, description, receivingBank,  invoiceNo, paymentRef) 
    VALUES ('DEMO', 'DEMO', '2024-02-28', '2025-02-27', '100000','Pro', 'Second subscription', 'GTbank', '1000234', '10349070087676');
`;

//VARCHAR(255) COMMENT 'This can be Payment, Receipt, Journal, etc',
//FOREIGN KEY (companyId) REFERENCES _clients (id) ON DELETE CASCADE ON UPDATE CASCADE,
//FOREIGN KEY (companyDomain) REFERENCES _clients (companyDomain) ON DELETE CASCADE ON UPDATE CASCADE
