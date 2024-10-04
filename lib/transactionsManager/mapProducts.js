
const mapProducts =(products)=>{
  const productsList = [{id:'', accountCode:'', accountName:'--Select--', selectable:true}];

    products?.forEach(acct => {
      const {id, productCode, productName, category} = acct;
      if(productCode && productName){
        productsList.push({id, accountCode:productCode, accountName:productCode+" "+productName, category, type:'QUANTITY', selectable:true})
      }
    });

    return productsList
  }


  export {mapProducts}