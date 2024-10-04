import { convertToTitleCase } from "@/lib/capitalize/capitalizeString";



export const getFinancialStatementData99 = ({tb, tbBalances, incomeClassCode})=>{
   
   
    //console.log(groupedTb)
    const bsRows = tbBalances.filter((dt)=> dt.typeCode < incomeClassCode);
    const plRows = tbBalances.filter((dt)=> dt.typeCode >= incomeClassCode);
    //console.log(bsRows)
    const bsRowsFmt = formatForTableBS(bsRows);
    const bsRowsFmtDetails = getDetailsRows(bsRowsFmt);

    const plRowsFmt = formatForTablePL(plRows);
   
    const plRowsFmtDetails = getDetailsRows(plRowsFmt);
    //console.log(plRowsFmt); 
    return {plRowsFmt, plRowsFmtDetails, bsRowsFmt, bsRowsFmtDetails}
};

export const getFinancialStatementData = ({tb, coaSMapped, retEarningsTypeCode, incomeClassCode})=>{

    //Filter out class rows
    coaSMapped = Object.values(coaSMapped).reduce((cum, dt)=> {
        if(!dt.subClass.toLowerCase().includes('class')){
           return {...cum, [dt.code]:{...dt, subClassTitle:convertToTitleCase(dt.subClass)}}
        }else{return cum}
     },{}); 

    //Group TB into the coaStructure (coaSMapped)
    const groupedTbs = {};
    const coasCodes = Object.keys(coaSMapped);
    for (const code of coasCodes) {
        const sameAcctGroup = tb?.filter((dt)=> dt.typeCode == code);
        let sameAcctGroupTotal = 0;
        for (const acct of sameAcctGroup) {
            sameAcctGroupTotal += parseFloat(acct.closingBal);
        }
        if(!groupedTbs[code]){groupedTbs[code] = {};}
        groupedTbs[code] = {...coaSMapped[code], closingBal:sameAcctGroupTotal, group:sameAcctGroup}
    }

    const bsRows = Object.values(groupedTbs).filter((dt)=> {return dt.class !=="income" && dt.class !=="expenses"});
    const plRows = Object.values(groupedTbs).filter((dt)=> {return dt.class === "income" || dt.class ==="expenses"});
 
    const plRowsFmt = formatForTablePL(plRows);
    //console.log(plRows, plRowsFmt);
       
    const netProfit = plRowsFmt.find((dt)=> dt?.classTitleName === "NETPROFITORLOSS")?.closingBal;
    const bsRowsFmt = formatForTableBS(bsRows, retEarningsTypeCode, netProfit);
    const bsRowsFmtDetails = getDetailsRows(bsRowsFmt);
    //console.log([netProfit, retEarningsTypeCode])
    
    const plRowsFmtDetails = getDetailsRows(plRowsFmt);
    //console.log(plRowsFmt); 
    return {plRowsFmt, plRowsFmtDetails, bsRowsFmt, bsRowsFmtDetails}
};


function formatForTableBS(data, retEarningsTypeCode, netProfit){
    const fmtRows = [
        {classTitle:"Asset", title:"", closingBal:"", subClass:"assetClass", rowStyle:"font-bold", emptyRow:true, classNameTD:true},
        {classTitle:"Non Current Asset", title:"", closingBal:"", subClass:"nonCurrentAsset", emptyRow:true,}
    ];
    const emptyRow = {classTitle:"", title:"", closingBal:"", subClass:"", emptyRow:true, rowStyle:"font-bold"};
    let classSumAsset = 0; 
    let classSumLiab = 0; 
    let classSumEquity = 0;

    for (let i = 0; i < data.length; i++) {
        const currentRow = data[i];
        const prevRow = fmtRows.length -1? fmtRows[fmtRows.length -1] : {};
        const nextRow = data[i+1];
        //Add Net profit
        if(currentRow.code == retEarningsTypeCode){
            fmtRows.push({classTitle:"", title:"For the year", closingBal:netProfit, subClass:"", rowStyle:"", emptyRow:true});
            classSumEquity += netProfit;
        }
        
        //subClass =  nonCurrentAsset, currentAsset, nonCurrentLiability, currentLiability, equity 
        if(prevRow?.subClass === currentRow.subClass){
            //Add current row
            fmtRows.push({...currentRow, classTitle:""});
            //Update current row class total
            if(currentRow?.class === "asset"){classSumAsset += currentRow.closingBal};
            if(currentRow?.class === "liability"){classSumLiab += currentRow.closingBal};
            if(currentRow?.class === "equity"){classSumEquity += currentRow.closingBal};
        }else{    
            //Adding Total Row
            if(currentRow.subClass.toLowerCase().includes('noncurrentliability') ||
                currentRow.subClass.toLowerCase() == 'equity'){
                const closingBal = prevRow?.class === "asset"? classSumAsset : classSumLiab;
                fmtRows.push({classTitle:"Total " +convertToTitleCase(prevRow.class), title:"", closingBal, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:''});
                //fmtRows.push(emptyRow);
            }
             //Add row class 
            //fmtRows.push({classTitle:convertToTitleCase(currentRow.subClass), title:"", closingBal:"", subClass:currentRow.subClass, emptyRow:true,})
            
            //Add subClass Row
            fmtRows.push({classTitle:currentRow.subClassTitle, title:"", closingBal:"", subClass:currentRow.subClass});
            
            //Add subClass Row
            fmtRows.push({...currentRow, classTitle:""});
            if(currentRow?.class === "asset"){classSumAsset += currentRow.closingBal};
            if(currentRow?.class === "liability"){classSumLiab += currentRow.closingBal};
            if(currentRow?.class === "equity"){classSumEquity += currentRow.closingBal};
        }
        //Add Total Liability & Equity row
        if(currentRow.class === "equity" && (!nextRow?.class || nextRow?.class !== "equity") ){
            fmtRows.push({classTitle:"Total Liability & Equity", title:"", closingBal:classSumLiab + classSumEquity, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:''});
            fmtRows.push(emptyRow);
        }
    }
    //console.log(fmtRows)
    return fmtRows
}


function formatForTablePL(data){
    //display keys = ["classTitle", "title", "closingBal"]
    const fmtRows = [
        {class:"income", classTitle:"Income", title:"", closingBal:"", subClass:"Income", rowStyle:"font-bold", emptyRow:true, classNameTD:true}
    ];
    const emptyRow = {classTitle:"", title:"", closingBal:"", subClass:"", emptyRow:true, rowStyle:"font-bold"}; 
    let sumObj = {
        income: 0,
        cos:0,
        gross:0,
        expenses:0,
    }
    const incomeClassGroup = data.filter(dt=> dt.class.toLocaleLowerCase() === "income");
    const cosClassGroup = data.filter(dt=> dt.subClass.toLocaleLowerCase() === "costofgoodssold");
    const expClassGroup = data.filter(dt=> { return dt.class === "expenses" && dt.subClass.toLocaleLowerCase() !== "costofgoodssold"});
    
    incomeClassGroup.forEach(row => {
        fmtRows.push(row);
        sumObj.income += row.closingBal;
    });
    //Add Income Total row
    fmtRows.push({classTitle:"Total Income", title:"", closingBal:sumObj.income, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
    fmtRows.push(emptyRow);
    
    if(cosClassGroup?.length){
        fmtRows.push({classTitle:"Cost of Sale", title:"", subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
        cosClassGroup?.forEach(row => {
        fmtRows.push(row);
        sumObj.cos += row.closingBal;
        });
        fmtRows.push({classTitle:"Total Cost of Sale", title:"", closingBal:sumObj.cos, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
        fmtRows.push(emptyRow);
        sumObj.gross = sumObj.income + sumObj.cos;
        fmtRows.push({classTitle:"Gross (Income) / Loss", title:"", closingBal:sumObj.gross, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
    }

    if(expClassGroup?.length){
        fmtRows.push({classTitle:"Expenses", title:"", subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
        expClassGroup?.forEach(row => {
        fmtRows.push(row);
        sumObj.expenses += row.closingBal;
        });
        fmtRows.push({classTitle:"Total Expenses", title:"", closingBal:sumObj.expenses, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
        fmtRows.push(emptyRow);
    }
    fmtRows.push(emptyRow);
    fmtRows.push({classTitle:"(Net Profit) or Loss", classTitleName:'NETPROFITORLOSS', title:"", closingBal:sumObj.gross + sumObj.expenses, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});

    return fmtRows

}


function getDetailsRows(fmtRows){
    //console.log(fmtRows)
    if(!fmtRows?.length) return fmtRows;

    const detailsRows = [];
    for (let i = 0; i < fmtRows.length; i++) {
        const row = fmtRows[i];
        let newRow = {...row};
        let lstRowCode = "";
        if(row?.group?.length){
            newRow = {...newRow, accountCode:newRow.title, title:"", closingBal:""} //Group will form the group header.Eg Bank
            detailsRows.push(newRow);
            for (let j = 0; j < row.group.length; j++) {
                const groupRow = row.group[j];
                newRow = {...row, ...groupRow, accountCode:"", title:groupRow.accountCode+" "+groupRow.name, titleClassName:groupRow.classNameTD, closingBalClassName:groupRow.classNameTD, classNameTD:'', classTitle:''};
                detailsRows.push(newRow);
                lstRowCode = newRow.accountCode;   
            }
        }else{
            newRow = {...newRow, accountCode:newRow.title, title:""} 
            detailsRows.push(newRow)
        }
        
    }
    return detailsRows
}

function getDetailsRows99(fmtRows){
    console.log(fmtRows)
    if(!fmtRows?.length) return fmtRows;

    const detailsRows = [];
    for (let i = 0; i < fmtRows.length; i++) {
        const row = fmtRows[i];
        let newRow = {...row};
        let lstRowCode = "";
        if(row?.group?.length){
            for (let j = 0; j < row.group.length; j++) {
                const groupRow = row.group[j];
                newRow = {...row, ...groupRow, title:groupRow.name, classTitle:''};
                detailsRows.push(newRow);
                lstRowCode = newRow.accountCode;   
            }
        }
        
        if(newRow?.emptyRow || newRow?.closingBal){
            //Prevent duplicate insertion
            if(lstRowCode !== newRow.accountCode){
                detailsRows.push(newRow)
            }
        }
    }
    return detailsRows
}

