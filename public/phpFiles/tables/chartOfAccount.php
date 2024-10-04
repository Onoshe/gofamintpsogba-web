<?php

function createCoaStructure ($tableName, $refTableName){
    return "CREATE TABLE IF NOT EXISTS $tableName (
            id INT(11) NOT NULL AUTO_INCREMENT,
            accountName	VARCHAR(512),
            accountCode	INT,
            description VARCHAR(512),
            typeCode	INT,
            accountType	VARCHAR(512),
            typeName	VARCHAR(512),
            addToDashboard	VARCHAR(512),
            inactive	INT,
            deleted	    INT,
            createdBy	VARCHAR(255),
            createdAt VARCHAR(255),
            updatedBy VARCHAR(255),
            updatedAt VARCHAR(255),
            PRIMARY KEY (id),
            FOREIGN KEY (typeCode) REFERENCES $refTableName(id)
    ); engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;";
};


function insertDataCoaStructure ($tableName){
    return "INSERT INTO $tableName (accountName, accountCode, description, typeCode, accountType, typeName, addToDashboard, createdBy, updatedBy) VALUES
	('Motor Vehicles', '111000', 'Non -current assets, Motor Vehicles', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO'),
	('Office Equipments', '112000', 'Non -current assets, Office Equipment', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO'),
	('Furnitures & Fittings', '113000', 'Non -current assets, Furnitures & Fittings', 111, 'Non-current Asset', 'nonCurrentAsset', '0', 'DEMO', 'DEMO'),
	('ABC Bank- Current Account', '121000', 'Current Account with ABC Bank, Allen Branch, LA', 131, 'Bank', 'bank', '1', 'DEMO', 'DEMO'),
	('Petty Cash', '131000', 'Petty Cash - Main', 132, 'Cash', 'cash', '1', 'DEMO', 'DEMO'),
	('Bank Clearing Account', '122100', 'Temporary bank Clearing account', 133, 'Payment Clearing', 'paymentClearing', '1', 'DEMO', 'DEMO'),
	('Cash Clearing Account', '122200', 'Temporary cash clearing account', 133, 'Payment Clearing', 'paymentClearing', '1', 'DEMO', 'DEMO'),
	('Account Receivables', '151000', 'Account Receivables', 141, 'Account Receivables', 'accountReceivables', '1', 'DEMO', 'DEMO'),
	('Receivables Control', '152000', 'Receivable Control Account groups multiple customers into a single account', 142, 'Account Receivable Control', 'accountReceivableControl', '1', 'DEMO', 'DEMO'),
	('Prepaid Rent', '171000', 'Office prepaid rent', 143, 'Other Current Asset', 'otherCurrentAsset', '0', 'DEMO', 'DEMO'),
	('Inventory', '161000', 'Inventory account', 151, 'Inventory', 'inventory', '0', 'DEMO', 'DEMO'),
	('Inventory Control', '162000', 'Inventory control account groups multiple inventory into a single account', 152, 'Inventory Control', 'inventoryControl', '0', 'DEMO', 'DEMO'),
	('Account Payables', '221000', 'Account Payables', 231, 'Account Payables', 'accountPayable', '1', 'DEMO', 'DEMO'),
	('Payables Control', '222000', 'Payables Control account groups multiple vendors into a single account', 232, 'Payables Control', 'accountPayableControl', '1', 'DEMO', 'DEMO'),
	('Accrued Expenses', '231000', 'Accrued Expenses account', 241, 'Accruals', 'accruals', '0', 'DEMO', 'DEMO'),
	('Ordinal Share Capital', '311000', 'Ordinary Share Capital', 311, 'Equity', 'equity', '0', 'DEMO', 'DEMO'),
	('Deposit for Shares', '312000', 'Deposit for Shares ', 311, 'Equity', 'equity', '0', 'DEMO', 'DEMO'),
	('Retained Earnings', '313000', 'Retained Earnings is the ', 321, 'Retained earnings', 'retainedEarnings', '0', 'DEMO', 'DEMO'),
	('Income', '411000', 'Income account', 411, 'Income', 'income', '1', 'DEMO', 'DEMO'),
	('Other Income', '412000', 'Other Income account', 421, 'Other Income', 'otherIncome', '0', 'DEMO', 'DEMO'),
	('Cost of Goods Sold Control', '511000', 'Goods Sold Control', 511, 'Cost of Goods Sold', 'costOfGoodsSold', '0', 'DEMO', 'DEMO'),
	('Salaries and Wages', '521000', 'Insurance Premium account', 521, 'Operating Expenses', 'operatingExpenses', '1', 'DEMO', 'DEMO'),
	('Insurance Premium', '531001', 'Salaries and Wages account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Repairs and Maintenance', '531002', 'Repairs and Maintenance account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Rents', '531003', 'Rents account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Rates', '531004', 'Rates account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Directors Emoluments', '531005', 'Directors Emoluments account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Donation', '531006', 'Donation account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Bad Debts', '531007', 'Bad Debts account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Bank Charges', '531008', 'Bank Charges account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Pension and Other Retirement Benefits', '531009', 'Pension and Other Retirement Benefits expenses account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Audit Fees', '531010', 'Audit Fees expensesaccount', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Legal and Other Professional Fees', '531011', 'Legal and Other Professional Fees expenses account', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Depreciation Charge- Office Equiment', '531012', 'Depreciation Charge for Office Equiment', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Depreciation Charge- Motor Vehicle', '531013', 'Depreciation Charge for Motor Vehicle', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO'),
	('Depreciation Charge- Furniture & Fittings', '531014', 'Depreciation Charge for Furniture & Fittings', 521, 'Operating Expenses', 'operatingExpenses', '0', 'DEMO', 'DEMO');";
}