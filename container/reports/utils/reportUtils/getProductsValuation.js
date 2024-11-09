const keysValuation = ['transactionDate',  'transactionNo', 'description', 'quantity',  'quantBalance', 'unitCost',  'cost', 'balance'];
const keysValuationSum = ['productCode', 'productName','category', 'description', 'costingMethod', 'stockOpening', 
        'stockIn', 'stockOut', 'stockClosing', 'costPerUnit', 'valuation'];

const headerTitleValArr = [
    {name:'transactionDate', title:'Tran Date'},
    {name:'transactionNo', title:'Tran No'},
    {name:'description', title:'Description'},
    {name:'quantity', title:'Quantity'},
    //{name:'pUnitCost', title:'Unit Cost'},
    {name:'quantBalance', title:'Qty Balance'},
    {name:'unitCost', title:'Average Unit Cost'},
    {name:'cost', title:'Cost'},
    {name:'balance', title:'Closing balance'},

    {name:'costPU', title:'Unit Cost'},
    {name:'cost', title:'Cost'}, 
    {name:'wgtAvgUnitCost', title:'Wgt-Avg Unit Cost'}, 
]
const headerTitleVal = keysValuation.map((key)=> headerTitleValArr.find((dt)=> dt.name == key));
const headerTitleSumArr = [
    {name:'productCode', title:'Product Code'},
    {name:'category', title:'Category'},
    {name:'description', title:'Description'},
    {name:'costingMethod', title:'Costing Method'},
    {name:'stockOpening', title:'Stock Opening'},
    {name:'stockIn', title:'Stock In'},
    {name:'stockOut', title:'Stock Out'},
    {name:'stockClosing', title:'Stock Closing'},
    {name:'costPerUnit', title:'Cost Per Unit'},
    {name:'valuation', title:'Valuation'},
    {name:'productName', title:'Product Name'},
]
const headerTitleSum = keysValuationSum.map((key)=> headerTitleSumArr.find((dt)=> dt.name == key));


export const getProductsValuation =({reportName,  transProcessor,  dateForm, products, viewTransId})=>{
    const valuationSummary = getValuationSummary({transProcessor, products});
    let product = {};
    if(viewTransId){
        product = products.find(e=> e.productCode == viewTransId);
    }
    //console.log(viewTransId)
    let result = {};
    let productLedgers = transProcessor.getPersonalLedgers('productsLedger', dateForm, viewTransId);
    //console.log(productLedgers)
    if(viewTransId){
        productLedgers = productLedgers.map((dt)=> {
            const isDr = dt.entryType === "DR";
            const updatedRow = {...dt, descriptionClassName:"", transactionNoClassName:"", clickables:[], unitCost:dt?.prodBal?.avgCost, cost:isDr? dt.debit : dt?.credit? -dt.credit : ''};
            const row = !dt.transactionNo? {...updatedRow, transactionNo:dt.description, description:''} : 
                {...updatedRow, description:isDr? "Purchase" : "Sale"};
            return row
        });
        productLedgers = productLedgers.filter((dt)=> {return dt.cost && dt.balance});
    };

    const rowKeysShow = viewTransId? keysValuation : keysValuationSum;
    const pdfData = {
        reportRowKeys:[],
        noFmtCols:[],
        headerFSize:[14],
        tableColsWch:[], //Empty is auto
        tableColsFSize:8,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:8,
    };

    pdfData.reportRowKeys = rowKeysShow;
    pdfData.noFmtCols = [4,5,6,7,8];
    pdfData.tableColsWch = []; //[15, 30, "", "", "", "", "", "", "", ""];
    
    const rows = viewTransId? productLedgers : valuationSummary;
    const rowHeaders = viewTransId? headerTitleVal : headerTitleSum;
    result = {name:reportName, title:viewTransId? product?.productName+" "+viewTransId+"- Valuation" : "Products Valuation", 
        clickables:viewTransId? "" : ["productCode"], rowKeysShow, rowHeaders, rows, pdfData, col1WchInDigit:30}
    return result
 };

function getValuationSummary({transProcessor, products}){
    const productLedgersObj = transProcessor.processTransactions().productsLedger;
    const valuation = [];
    let valuationTotal = 0;
    //console.log(productLedgersObj)
    for (const prodCode in productLedgersObj) {
        const productLedger = productLedgersObj[prodCode];
        const len = productLedger?.trans?.length;

        let stockRec = {in:0, out:0}; 
        let stockOpening = 0;
        let stockOpeningUnitCost = 0;
        let unitCostForFinalVal = 0;
        productLedger?.trans?.forEach(tran => {
            const {entryType, amount, quantity, isOB} = tran;
            const isDr = entryType === "DR";
            if(!isOB){ //StockIn & stockOut must not be computed for opening stock. isOB=> isOpeningBalance
                let qty = parseFloat(Math.abs(quantity));
                qty = isNaN(qty)? 0 : qty;
                stockRec.in += isDr? qty : 0;
                stockRec.out += isDr? 0 : qty;
                unitCostForFinalVal = tran?.prodBal?.avgCost
            }else{
                if(tran?.qtyBalance){stockOpening = tran?.qtyBalance;}
                if(tran?.unitCost){
                    stockOpeningUnitCost = tran?.unitCost;
                    unitCostForFinalVal = stockOpeningUnitCost
                }
            } 
        });
        const product = products.find((dt)=> dt.productCode == prodCode);
        const closingStock = stockOpening + (stockRec.in - stockRec.out);
        //let unitCost = stockOpeningUnitCost || productLedger?.trans[len-1]?.prodBal?.avgCost;
        const value = unitCostForFinalVal * closingStock;
                valuationTotal += value;
        const val = {
            'productCode':prodCode,  
            'productName':product.productName,
            'category':product.category, 
            'description':product.description, 
            'costingMethod':"Weighted Average", 
            'stockOpening': stockOpening,
            'stockIn':stockRec.in, 
            'stockOut':stockRec.out, 
            'stockClosing':closingStock, 
            'costPerUnit':unitCostForFinalVal, 
            'valuation':value,
            'clickables':['productCode'],
            'productCodeClassName':'hover:text-blue-700 active:text-blue-400 cursor-pointer hover:underline'
        };
        valuation.push(val)
    }
    valuation.push({productCode:"Total", valuation:valuationTotal, classNameTD:"font-bold"})
    //console.log(valuation, productLedgersObj)
    return valuation
}