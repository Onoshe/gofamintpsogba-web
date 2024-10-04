

function getErrorMessage(errorType, key, index, title){
    const i = index +1;
    const e = index;
    const errorMessages ={
        'FORMAT': `Format error! Please check the format for ${key} column in row ${i}`,
        'DATA_TYPE': `Data type error in row ${i} for ${key} column`,
        'VALUE_EXIST': `Value entered in ${key} column in row ${i} already exist`,
        'VALUE_INVALID': `Value entered in ${key} column in row ${i} is not valid`,
        'REQUIRED_VALUE': `Columns: ${key} for all rows are required. Check row ${i}`,
        'DUPLICATES': `Duplicate values exist for ${key} in row ${i}`,
        'INVALID_KEY': `Header '${key}' is an invalid header. Please, check`,
        'REQUIRED_KEY': `Required header, '${key}' is missing in the table`,
        'NO_DATA': `No data uploaded. Please, upload your data.`,        
        'KEY_VOID': `Header '${key}' is not included in the form. Please check`,

        'EMPTY_VALUE': `${title} in row ${i} is empty. Please, check`,
        'DATA_TYPE_': `Data type error for ${title} in row ${i}`,
        'CODE_NOTFOUND': `${title} in row ${i} was not found`,
        'VALUE_INVALID_': `${title} in row ${i} is not valid`,
        'NO_VALUE': `No value is expected in ${title} in row ${i}.`,

        'NOT_BALANCE': `Your entries are not balancing. Please check`,
        'DATA_TYPE__': `Data type error for ${title} in entry ${i}`,
        'EMPTY_VALUE_': key === 'description'? `${title} is empty. Please fill it.` : `${title} in entry ${i} is empty. Please, check`,
        'FORMAT_': `Please select ${key} of transaction.`,
        'EMPTY_QUANT_': `Please select ${key} for entry ${i} transaction`,

        'CHAR_LENGTH':`Maximum length for ${key.split("|")[0]} is ${key.split("|")[1]}. Please check row ${i}`,
        'INVALID_PRODUCTCODE': `Product code in row ${i} is invalid. Code must be alphanumeric and must not begin with a digit.`,
        'INVALID_ACCTCODE':`Account Code cannot start with zero! Check row ${i}`,

        'INVENT_ERROR':`Inventory control cannot be recorded from this module. Use Record Product. Check row ${i}`,
        
        'ENTRY1_SEL':`Entry type for product has not been selected. Please, select debit or credit`,
        'ENTRY2_SEL':`Please, select the double entry for the product adjustmnet`,
        'ENTRY2_SEL_SAME':`Same double entries! Please check`,
        'PROD_ADJ_TYPE':`Please select what to adjust, either quantity or cost under 'Adjust Product By'`,
    }
        return errorMessages[errorType]
  }

  export {getErrorMessage};


  const i = 0;
  const errorMessagesPrev ={
    'NO_DATA':`Pls, upload your data`,
        'MISSING_KEY':`There is a missing key in your uploaded data. Check if header keys are correct.`,
        'DUPLICATES_ACCT_CODES':`There is a duplicate account code in your data. Check row ${i}`,
        'DATE_ERROR':`Your date format in row ${i} is invalid`,
        'ACCOUNT_EXIST':`The account code in row ${i} already exist`,
        'ACCOUNT_NOT_BALANCE':`Pls check the total balance. Total debits must be equal to total credits.`,
        'REQUIRED_FIELD_EMPTY':`Header ${i} if missing from your form. It is a required header, pls include it`,
        'REQUIRED_VALUE_EMPTY':`Required value in row ${i} is missing`,
        'DESCRIPTION_EMPTY':`Enter description for transaction number ${i}.`,
        'ACCOUNT_NOT_FOUND':`One of the accounts on transaction number ${i} does not exist.`,
        'AMOUNT_MISMATCH':`Amounts on transaction number ${i} does not balance.`,
        'SAME_ACCOUNT':`You have selected same accounts for transaction number ${i}.`,
        'SAME_SUBACCOUNT':`You have selected same sub accounts for transaction number ${i}.`,
        'INVALID_DEBIT_SUBACCOUNT':`Customer's account on transaction number ${i} does not exist.`,
        'INVALID_CREDIT_SUBACCOUNT':`Vendor's account on transaction number ${i} does not exist.`,
        'INVALID_KEY':`An invalid header, '${i}' was introduced.`,
        'TYPE_ERROR':`Type in row ${i} is not valid. Type should either be Individual or Company`,
        'TITLE_ERROR':`Title in row ${i} is not valid. Valid titles are: Mr, Mrs, Miss, Dr`,
        'ACCOUNT_CODE_ERROR':`Account code prefix missing in row ${i}`,
        'ACCOUNT_CODE_PREFIX_ERROR':`Account code prefix mismatch in row ${i}`
  }