

const keys = ["category", "productName", "productCode", "description"];
const requiredFields = ["category", "productName", "productCode"];

function productCodeTest(str) {
  return /^[a-zA-Z][a-zA-Z0-9]*$/.test(str);
}

function validateAndFormatProducts(forms, productsList, isEdit) {
    if(!forms?.length) return {
      error: true,
      errorType: 'NO_DATA',
      rowIndex: "",
      key:'',
    };

    const acctCodes = [];
    // Check if required fields are empty
    for (let i = 0; i < requiredFields.length; i++) {
      const key = requiredFields[i];
      if(!Object.keys(forms[0]).includes(key)) 
        return {
          error: true,
          errorType: 'REQUIRED_KEY',
          rowIndex: i,
          key,
        };
    }

     //Check form keys if valid- Invalid key
    const formKeys = Object.keys(forms[0]);
    for (let i = 0; i < formKeys.length; i++) {
    const key = formKeys[i];
      if(!keys.includes(key)) 
        return {
          error: true,
          errorType: 'INVALID_KEY',
          indexRow:'',
          key,
        };
    }

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i]; 
       
      let {
        category,
        productName,
        productCode,
      } = form;

    //Check for empty value on required fields
    if(!category || !productName || !productCode){
      return {
        error: true,
        errorType: 'REQUIRED_VALUE',
        rowIndex: i,
        key:'category, productName, productCode'

      };
    }

    //ProductCode is alphanumeric and should not begin with a digit
    const isOkay = productCodeTest(productCode);
    if(!isOkay){
      return {
        error: true,
        errorType: 'INVALID_PRODUCTCODE',
        rowIndex: i,
        key:'productCode'
      };
    }

    //Check for field length: Category - 24; ProductName- 52; ProductCode- 15;
    const catStr = category.toString();
    const productNmStr = productName.toString();
    const productCodeStr = productCode.toString();

    if(catStr.length > 24){
      return {
        error: true,
        errorType: 'CHAR_LENGTH',
        rowIndex: i,
        key:'category|24'
      };
    }
    if(productNmStr.length > 52){
      return {
        error: true,
        errorType: 'CHAR_LENGTH',
        rowIndex: i,
        key:'Product Name|52'
      };
    }
    if(productCodeStr.length > 15){
      return {
        error: true,
        errorType: 'CHAR_LENGTH',
        rowIndex: i,
        key:'Product Code|15'
      };
    }


    //Check for duplicate productCode. If duplicate productCode exist in the uploaded data
    if(productCode || productCode !==undefined || productCode !==""){
      if(acctCodes.includes(productCode)){
        return {
          error: true,
          errorType: 'DUPLICATES',
          rowIndex: i,
          key:'productCode'
        };
      }else{
        acctCodes.push(productCode);
      }
    }
    
    // Check if productCode already exist in ProductList?
     if(!isEdit){
        if (productsList?.some((acct) => acct?.productCode === productCode)) {
          return {
            error: true,
            errorType: 'VALUE_EXIST',
            rowIndex: i,
            key:'productCode'
          };
        }
      }
    }

    return { error: false, data:forms};
  }
  
export {validateAndFormatProducts}

/*----------------------RULES-------------------------------
 

************************************************************/