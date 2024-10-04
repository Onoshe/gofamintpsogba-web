<?php

function createChartOfAccount ($tableName, $refTableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            accountName	VARCHAR(512),
            accountCode	INT,
            description VARCHAR(512),
            typeCode	INT,
            accountType	VARCHAR(512),
            typeName	VARCHAR(512),
            productCat VARCHAR(255) COMMENT 'This relates Product category to the transaction',
			addToDashboard	VARCHAR(512),
            inactive INT(1) NOT NULL DEFAULT 0 COMMENT '1 is activation',
            deleted INT(1) NOT NULL DEFAULT 0,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
};

// FOREIGN KEY (typeCode) REFERENCES $refTableName(code) ON DELETE CASCADE ON UPDATE CASCADE
function insertDataToChartOfAccount ($tableName){
    return "INSERT INTO $tableName (accountName, accountCode, description, typeCode, accountType, typeName, addToDashboard, createdBy, updatedBy, productCat) VALUES
	('Motor Vehicles', '111000', 'Non -current assets, Motor Vehicles', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO', ''),
	('Motor Vehicles - Accum Depr', '111500', 'Motor Vehicles Accumulated Depreciation', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO', ''),
	('Office Equipments', '112000', 'Non -current assets, Office Equipment', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO', ''),
	('Office Equipments - Accum Depr', '112500', 'Office Equipments Accumulated Depreciation', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO', ''),
	('Furnitures & Fittings', '113000', 'Non -current assets, Furnitures & Fittings', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO', ''),
	('Furnitures & Fittings - Accum Depr', '113500', 'Furnitures & Fittings Accumulated Depreciation', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO', ''),

	('Mainland Bank- Current Account', '121000', 'Mainland bank Current Account', 131, 'Bank', 'bank', '1', 'DEMO', 'DEMO', ''),
	('Finance Bank- Current Account', '121500', 'Finance bank Current Account', 131, 'Bank', 'bank', '1', 'DEMO', 'DEMO', ''),
	('Mainland Fixed Deposit', '121600', 'Mainland Fixed Deposit account', 131, 'Bank', 'bank', '1', 'DEMO', 'DEMO', ''),

	('Petty Cash', '131000', 'Petty Cash - Main', 132, 'Cash', 'cash', '1', 'DEMO', 'DEMO', ''),
	('Bank Clearing Account', '122100', 'Temporary bank Clearing account', 133, 'Payment Clearing', 'paymentClearing', '1', 'DEMO', 'DEMO', ''),
	('Cash Clearing Account', '122200', 'Temporary cash clearing account', 133, 'Payment Clearing', 'paymentClearing', '1', 'DEMO', 'DEMO', ''),
	('Account Receivables', '151000', 'Account Receivables', 141, 'Account Receivables', 'accountReceivables', '1', 'DEMO', 'DEMO', ''),
	('Receivables Control', '152000', 'Receivable Control Account groups multiple customers into a single account', 142, 'Account Receivable Control', 'accountReceivableControl', '1', 'DEMO', 'DEMO', ''),
	('Prepaid Rent', '171000', 'Office prepaid rent', 143, 'Other Current Asset', 'otherCurrentAsset', '0', 'DEMO', 'DEMO', ''),
	('Inventory', '161000', 'Inventory account', 151, 'Inventory', 'inventory', '0', 'DEMO', 'DEMO', ''),
	('Inventory Control', '162000', 'Inventory control account groups multiple inventory into a single account', 152, 'Inventory Control', 'inventoryControl', '0', 'DEMO', 'DEMO', ''),
	('Inventory Adjustment', '163000', 'Adjustment on Inventory is made from this account', 153, 'Inventory Adjustment', 'inventoryAdjustment', '0', 'DEMO', 'DEMO', ''),
	('Account Payables', '221000', 'Account Payables', 231, 'Account Payables', 'accountPayable', '1', 'DEMO', 'DEMO', ''),
	('Payables Control', '222000', 'Payables Control account groups multiple vendors into a single account', 232, 'Payables Control', 'accountPayableControl', '1', 'DEMO', 'DEMO', ''),
	('Accrued Expenses', '231000', 'Accrued Expenses account', 241, 'Accruals', 'accruals', '0', 'DEMO', 'DEMO', ''),
	('Unrealised Interest', '231500', 'Unrealised Interest account', 241, 'Account Payables', 'accountPayable', '0', 'DEMO', 'DEMO', ''),

	('Ordinal Share Capital', '311000', 'Ordinary Share Capital', 311, 'Equity', 'equity', '0', 'DEMO', 'DEMO', ''),
	('Deposit for Shares', '312000', 'Deposit for Shares ', 311, 'Equity', 'equity', '0', 'DEMO', 'DEMO', ''),
	('Retained Earnings', '313000', 'Retained Earnings is the ', 321, 'Retained earnings', 'retainedEarnings', '0', 'DEMO', 'DEMO', ''),
	('Income', '411000', 'Income account', 411, 'Income', 'income', '1', 'DEMO', 'DEMO', ''),
	
	('Income- Grocery', '411001', 'Income account', 411, 'Income', 'income', '1', 'DEMO', 'DEMO', 'Grocery'),
	('Income- Furnitures', '411002', 'Income account', 411, 'Income', 'income', '1', 'DEMO', 'DEMO', 'Furnitures'),
	('Income- Appliances', '411003', 'Income account', 411, 'Income', 'income', '1', 'DEMO', 'DEMO', 'Appliances'),
	
	('Other Income', '412000', 'Other Income account', 421, 'Other Income', 'otherIncome', '0', 'DEMO', 'DEMO', ''),
	('Interest Income', '412150', 'Interest Income account', 421, 'Other Income', 'otherIncome', '0', 'DEMO', 'DEMO', ''),
	('Interest on Savings', '412155', 'Interest Income on bank account', 421, 'Other Income', 'otherIncome', '0', 'DEMO', 'DEMO', ''),

	('Cost of Goods Sold Control', '511000', 'Goods Sold Control', 511, 'Cost of Goods Sold', 'costOfGoodsSold', '0', 'DEMO', 'DEMO', ''),
	('Cost of Goods Sold- Grocery', '511001', 'Goods Sold Control', 511, 'Cost of Goods Sold', 'costOfGoodsSold', '0', 'DEMO', 'DEMO', 'Grocery'),
	('Cost of Goods Sold- Furnitures', '511002', 'Goods Sold Control', 511, 'Cost of Goods Sold', 'costOfGoodsSold', '0', 'DEMO', 'DEMO', 'Furnitures'),
	('Cost of Goods Sold- Appliances', '511003', 'Goods Sold Control', 511, 'Cost of Goods Sold', 'costOfGoodsSold', '0', 'DEMO', 'DEMO', 'Appliances'),
	
	('Salaries and Wages', '521000', 'Salaries and Wages account', 521, 'Operating Expenses', 'operatingExpenses', '1', 'DEMO', 'DEMO', ''),
	('Pension and Other Retirement Benefits', '521100', 'Pension and Other Retirement Benefits expenses account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),

	('Insurance Premium', '530000', 'Insurance Premium account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Motor Running expenses', '530020', 'Motor Running expenses account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Repairs and Maintenance', '530040', 'Repairs and Maintenance account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Rents', '530060', 'Rents account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Electricity', '530080', 'Electricity account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Printing And Stationeries', '530100', 'Printing And Stationeries account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Travelling and Accommodation', '530120', 'Travelling and Accommodation account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Telephone and Postages', '530140', 'Telephone and Postages account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Professional and Legal expenses', '530160', 'Professional and Legal expenses account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Medical Expenses', '530180', 'Medical Expenses account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Audit Fees', '530200', 'Audit Fees account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Directors Emoluments', '530220', 'Directors Emoluments account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Donation', '530240', 'Donation account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Bad Debts', '530280', 'Bad Debts account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Bank Charges', '530300', 'Bank Charges account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	
	('Audit Fees', '530320', 'Audit Fees expensesaccount', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Legal and Other Professional Fees', '530340', 'Legal and Other Professional Fees expenses account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	
	('Depreciation Charge- Office Equiment', '540000', 'Depreciation Charge for Office Equiment', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Depreciation Charge- Motor Vehicle', '540050', 'Depreciation Charge for Motor Vehicle', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', ''),
	('Depreciation Charge- Furniture & Fittings', '540100', 'Depreciation Charge for Furniture & Fittings', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO', '');";
}