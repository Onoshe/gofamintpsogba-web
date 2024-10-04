
export const coaStructure99 = [
    {name:"asset", code:100, title:'Asset', classCode:1, subCode:0, selectable:false,},
    {name:"nonCurrentAsset", code:111, title:'Non-current Asset', classCode:1, subCode:1, selectable:true,},
    {name:"bank", title:'Bank',code:131, classCode:1, subCode:2, selectable:true,},
    {name:"cash", title:'Cash', code:14, classCode:1, subCode:4, selectable:true,},
    {name:"paymentClearing", code:133, title:'Payment Clearing', classCode:1, subCode:3, selectable:true,},
    {name:"accountReceivable", code:15, title:'Account Receivable', classCode:1, subCode:5, selectable:true,},
    {name:"accountReceivableControl", code:16, title:'Account Receivable Control', classCode:1, subCode:6, selectable:true,},
    {name:"otherCurrentAsset", code:17, title:'Other Current Asset', classCode:1, subCode:7, selectable:true,},
    {name:"inventory", code:18, title:'Inventory', classCode:1, subCode:8, selectable:true,},
    {name:"inventoryControl", code:19, title:'Inventory Control', classCode:1, subCode:9, selectable:true,},
    
    {name:"liability", title:'Liability',code:20, classCode:2, subCode:0, selectable:false,},
    {name:"nonCurrentLiability", title:'Non-current Liability',code:21, classCode:2, subCode:1, selectable:true,},
    {name:"accountPayable", title:'Account Payable',code:22, classCode:2, subCode:2, selectable:true,},
    {name:"accountPayableControl", title:'Account Payable Control',code:23, classCode:2, subCode:3, selectable:true,},
    {name:"accruals", title:'Accruals', code:24, classCode:2, subCode:4, selectable:true,},
    {name:"otherCurrentPayables", title:'Other Current Payables',code:25, classCode:2, subCode:5, selectable:true,},

    {name:"equityMain",title:'Equity', code:30, classCode:3, subCode:0, selectable:false,},
    {name:"equity", title:'Equity', code:31, classCode:3, subCode:1, selectable:true,},
    //{name:"retainedEarnings", title:'Retained Earnings', code:32, classCode:3, subCode:2, selectable:false,},

    {name:"incomeMain", title:'Income', code:40, classCode:4, subCode:0, selectable:false,},
    {name:"income", title:'Income', code:41, classCode:4, subCode:1, selectable:true,},
    {name:"otherIncome", title:'Other Income', code:42, classCode:4, subCode:2, selectable:true,},

    {name:"expenses", title:'Expenses', classCode:5,code:50, subCode:0, selectable:false,},
    {name:"costOfGoodsSold", title:'Cost of Goods Sold',code:51,  classCode:5, subCode:1, selectable:true,},
    {name:"operatingExpenses", title:'Operating Expenses',code:52, classCode:5, subCode:2, selectable:true,},
    {name:"otherExpenses", title:'Other Expenses', code:53, classCode:5, subCode:3, selectable:true,},
];


export const coaStructure = [
    {
        "id": "1",
        "class": "asset",
        "name": "assetClass",
        "classCode": "1",
        "subCode": "0",
        "code": "100",
        "title": "Asset",
        "selectable": "0"
    },
    {
        "id": "2",
        "class": "asset",
        "name": "nonCurrentAsset",
        "classCode": "1",
        "subCode": "1",
        "code": "111",
        "title": "Non-current Asset",
        "selectable": "1"
    },
    {
        "id": "3",
        "class": "asset",
        "name": "bank",
        "classCode": "1",
        "subCode": "3",
        "code": "131",
        "title": "Bank",
        "selectable": "1"
    },
    {
        "id": "4",
        "class": "asset",
        "name": "cash",
        "classCode": "1",
        "subCode": "3",
        "code": "132",
        "title": "Cash",
        "selectable": "1"
    },
    {
        "id": "5",
        "class": "asset",
        "name": "paymentClearing",
        "classCode": "1",
        "subCode": "3",
        "code": "133",
        "title": "Payment Clearing",
        "selectable": "1"
    },
    {
        "id": "6",
        "class": "asset",
        "name": "accountReceivable",
        "classCode": "1",
        "subCode": "4",
        "code": "141",
        "title": "Account Receivable",
        "selectable": "1"
    },
    {
        "id": "7",
        "class": "asset",
        "name": "accountReceivableControl",
        "classCode": "1",
        "subCode": "4",
        "code": "142",
        "title": "Account Receivable Control",
        "selectable": "1"
    },
    {
        "id": "8",
        "class": "asset",
        "name": "otherCurrentAsset",
        "classCode": "1",
        "subCode": "4",
        "code": "143",
        "title": "Other Current Asset",
        "selectable": "1"
    },
    {
        "id": "9",
        "class": "asset",
        "name": "inventory",
        "classCode": "1",
        "subCode": "5",
        "code": "151",
        "title": "Inventory",
        "selectable": "1"
    },
    {
        "id": "10",
        "class": "asset",
        "name": "inventoryControl",
        "classCode": "1",
        "subCode": "5",
        "code": "152",
        "title": "Inventory Control",
        "selectable": "1"
    },
    {
        "id": "11",
        "class": "liability",
        "name": "liabilityClass",
        "classCode": "2",
        "subCode": "0",
        "code": "200",
        "title": "Liability",
        "selectable": "0"
    },
    {
        "id": "12",
        "class": "liability",
        "name": "nonCurrentLiability",
        "classCode": "2",
        "subCode": "1",
        "code": "211",
        "title": "Non-current Liability",
        "selectable": "1"
    },
    {
        "id": "13",
        "class": "liability",
        "name": "accountPayable",
        "classCode": "2",
        "subCode": "3",
        "code": "231",
        "title": "Account Payable",
        "selectable": "1"
    },
    {
        "id": "14",
        "class": "liability",
        "name": "accountPayableControl",
        "classCode": "2",
        "subCode": "3",
        "code": "232",
        "title": "Account Payable Control",
        "selectable": "1"
    },
    {
        "id": "15",
        "class": "liability",
        "name": "accruals",
        "classCode": "2",
        "subCode": "4",
        "code": "241",
        "title": "Accruals",
        "selectable": "1"
    },
    {
        "id": "16",
        "class": "liability",
        "name": "otherCurrentLiability",
        "classCode": "2",
        "subCode": "5",
        "code": "251",
        "title": "Other Current Liability",
        "selectable": "1"
    },
    {
        "id": "17",
        "class": "equity",
        "name": "equityClass",
        "classCode": "3",
        "subCode": "0",
        "code": "300",
        "title": "Equity",
        "selectable": "0"
    },
    {
        "id": "18",
        "class": "equity",
        "name": "equity",
        "classCode": "3",
        "subCode": "1",
        "code": "311",
        "title": "Equity",
        "selectable": "1"
    },
    {
        "id": "19",
        "class": "equity",
        "name": "retainedEarnings",
        "classCode": "3",
        "subCode": "2",
        "code": "321",
        "title": "Equity",
        "selectable": "0"
    },
    {
        "id": "20",
        "class": "income",
        "name": "incomeClass",
        "classCode": "4",
        "subCode": "0",
        "code": "400",
        "title": "Income",
        "selectable": "0"
    },
    {
        "id": "21",
        "class": "income",
        "name": "income",
        "classCode": "4",
        "subCode": "1",
        "code": "411",
        "title": "Income",
        "selectable": "1"
    },
    {
        "id": "22",
        "class": "income",
        "name": "otherIncome",
        "classCode": "4",
        "subCode": "2",
        "code": "421",
        "title": "Other Income",
        "selectable": "1"
    },
    {
        "id": "23",
        "class": "expenses",
        "name": "expensesClass",
        "classCode": "5",
        "subCode": "0",
        "code": "500",
        "title": "Expenses",
        "selectable": "0"
    },
    {
        "id": "24",
        "class": "expenses",
        "name": "costOfGoodsSold",
        "classCode": "5",
        "subCode": "1",
        "code": "511",
        "title": "Cost of Goods Sold",
        "selectable": "1"
    },
    {
        "id": "25",
        "class": "expenses",
        "name": "operatingExpenses",
        "classCode": "5",
        "subCode": "2",
        "code": "521",
        "title": "Operating Expenses",
        "selectable": "1"
    },
    {
        "id": "26",
        "class": "expenses",
        "name": "otherExpenses",
        "classCode": "5",
        "subCode": "3",
        "code": "531",
        "title": "Other Expenses",
        "selectable": "1"
    }
];