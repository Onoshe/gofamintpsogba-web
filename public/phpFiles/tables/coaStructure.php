<?php

function createCoaStructure ($tableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            class VARCHAR(255),
            name VARCHAR(255),
            classCode INT,
            subCode INT,
            code INT,
            title VARCHAR(255),
            selectable INT,
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
    return "INSERT INTO $tableName (class, name, classCode, subCode, code, title, selectable, createdBy, updatedBy) VALUES 
    ('asset','assetClass',1,0,100,'Asset',0,'DEMO','DEMO'),
	('asset','nonCurrentAsset',1,1,111,'Non-current Asset',1,'DEMO','DEMO'),
	('asset','bank',1,3,131,'Bank',1,'DEMO','DEMO'),
	('asset','cash',1,3,132,'Cash',1,'DEMO','DEMO'),
	('asset','paymentClearing',1,3,133,'Payment Clearing',1,'DEMO','DEMO'),
	('asset','accountReceivable',1,4,141,'Account Receivable',1,'DEMO','DEMO'),
	('asset','accountReceivableControl',1,4,142,'Account Receivable Control',1,'DEMO','DEMO'),
	('asset','otherCurrentAsset',1,4,143,'Other Current Asset',1,'DEMO','DEMO'),
	('asset','inventory',1,5,151,'Inventory',1,'DEMO','DEMO'),
	('asset','inventoryControl',1,5,152,'Inventory Control',1,'DEMO','DEMO'),
	('liability','liabilityClass',2,0,200,'Liability',0,'DEMO','DEMO'),
	('liability','nonCurrentLiability',2,1,211,'Non-current Liability',1,'DEMO','DEMO'),
	('liability','accountPayable',2,3,231,'Account Payable',1,'DEMO','DEMO'),
	('liability','accountPayableControl',2,3,232,'Account Payable Control',1,'DEMO','DEMO'),
	('liability','accruals',2,4,241,'Accruals',1,'DEMO','DEMO'),
	('liability','otherCurrentLiability',2,5,251,'Other Current Liability',1,'DEMO','DEMO'),
	('equity','equityClass',3,0,300,'Equity',0,'DEMO','DEMO'),
	('equity','equity',3,1,311,'Equity',1,'DEMO','DEMO'),
	('equity','retainedEarnings',3,2,321,'Equity',0,'DEMO','DEMO'),
	('income','incomeClass',4,0,400,'Income',0,'DEMO','DEMO'),
	('income','income',4,1,411,'Income',1,'DEMO','DEMO'),
	('income','otherIncome',4,2,421,'Other Income',1,'DEMO','DEMO'),
	('expenses','expensesClass',5,0,500,'Expenses',0,'DEMO','DEMO'),
	('expenses','costOfGoodsSold',5,1,511,'Cost of Goods Sold',1,'DEMO','DEMO'),
	('expenses','operatingExpenses',5,2,521,'Operating Expenses',1,'DEMO','DEMO'),
	('expenses','otherExpenses',5,3,531,'Other Expenses',1,'DEMO','DEMO');";
};