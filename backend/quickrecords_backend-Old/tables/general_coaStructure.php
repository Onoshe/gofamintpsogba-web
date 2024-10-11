<?php

function createCoaStructure ($tableName){

    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            class VARCHAR(255),
			subClass VARCHAR(255),
            name VARCHAR(255),
            classCode INT,
            subCode INT,
            code INT,
            title VARCHAR(255),
            selectable INT,
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            deleted INT(1) NOT NULL DEFAULT 0,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
			UNIQUE KEY `unique_code` (`code`) COMMENT 'Since code is being used as a foreign key and it is not a primary key, it must be set as unique', 
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};


function insertDataCoaStructure ($tableName){
    return "INSERT INTO $tableName (class, subClass, name, classCode, subCode, code, title, selectable, inactive, deleted, createdBy, createdAt, updatedBy, updatedAt) VALUES
	('asset', 'assetClass', 'assetClass', '1', '0', '100', 'Asset', '0', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'nonCurrentAsset', 'propertyPlant&Equipment', '1', '1', '111', 'Property Plant & Equipment', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'nonCurrentAsset', 'otherNonCurrentAsset', '1', '2', '121', 'Other Non Current Asset', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'bank', '1', '3', '131', 'Bank', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'cash', '1', '3', '132', 'Cash', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'paymentClearing', '1', '3', '133', 'Payment Clearing', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'accountReceivable', '1', '4', '141', 'Account Receivable', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'accountReceivableControl', '1', '4', '142', 'Account Receivable Control', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'otherCurrentAsset', '1', '4', '143', 'Other Current Asset', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'inventory', '1', '5', '151', 'Inventory', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'inventoryControl', '1', '5', '152', 'Inventory Control', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('asset', 'currentAsset', 'inventoryAdjustment', '1', '5', '153', 'Inventory Adjustment', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('liability', 'liabilityClass', 'liabilityClass', '2', '0', '200', 'Liability', '0', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('liability', 'nonCurrentLiability', 'nonCurrentLiability', '2', '1', '211', 'Non-current Liability', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('liability', 'currentLiability', 'accountPayable', '2', '3', '231', 'Account Payable', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('liability', 'currentLiability', 'accountPayableControl', '2', '3', '232', 'Account Payable Control', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('liability', 'currentLiability', 'accruals', '2', '4', '241', 'Accruals', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('liability', 'currentLiability', 'otherCurrentLiability', '2', '5', '251', 'Other Current Liability', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('equity', 'equityClass', 'equityClass', '3', '0', '300', 'Equity', '0', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('equity', 'equity', 'equity', '3', '1', '311', 'Equity', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('equity', 'equity', 'retainedEarnings', '3', '2', '321', 'Retained Earnings', '0', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('income', 'incomeClass', 'incomeClass', '4', '0', '400', 'Income', '0', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('income', 'income', 'income', '4', '1', '411', 'Income', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('income', 'income', 'otherIncome', '4', '2', '421', 'Other Income', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('expenses', 'expensesClass', 'expensesClass', '5', '0', '500', 'Expenses', '0', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('expenses', 'costOfGoodsSold', 'costOfGoodsSold', '5', '1', '511', 'Cost of Goods Sold', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('expenses', 'expenses', 'operatingExpenses', '5', '2', '521', 'Operating Expenses', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30'),
	('expenses', 'expenses', 'otherExpenses', '5', '3', '531', 'Other Expenses', '1', '0', '0', 'DEMO', '2024-07-30', 'DEMO', '2024-07-30');";
};


