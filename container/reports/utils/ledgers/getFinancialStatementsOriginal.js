import { convertToTitleCase } from "@/lib/capitalize/capitalizeString";

const iSKeys = ['class', 'account', 'amount'];
const bSKeys = ['classTitle', 'title', 'closingBal'];



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
     //getFinancialStatementData99({tb, tbBalances, incomeClassCode})
    //Filter out class rows
    coaSMapped = Object.values(coaSMapped).reduce((cum, dt)=> {
        if(!dt.subClass.toLowerCase().includes('class')){
           return {...cum, [dt.code]:{...dt, subClassTitle:convertToTitleCase(dt.subClass)}}
        }else{return cum}
     },{}); 

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
    const plRows = Object.values(groupedTbs).filter((dt)=> {return dt.class ==="income" || dt.class ==="expenses"});
    const plRowsFmt = formatForTablePL(plRows);
    
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
    return fmtRows
}


function formatForTablePL(data){
    const fmtRows = [
        {class:"income", classTitle:"Income", title:"", closingBal:"", subClass:"Income", rowStyle:"font-bold", emptyRow:true, classNameTD:true}
    ];
    const emptyRow = {classTitle:"", title:"", closingBal:"", subClass:"", emptyRow:true, rowStyle:"font-bold"};
    let classSumInc = 0; 
    let classSumExp = 0; 

    for (let i = 0; i < data.length; i++) {
        const currentRow = data[i];
        const prevRow = fmtRows[fmtRows.length -1];
        const nextRow = data[i+1];
        if(prevRow?.class === currentRow.class){
            fmtRows.push({...currentRow, classTitle:"", classTitle: prevRow.classTitle == currentRow.classTitle? "" : currentRow.classTitle});
            if(currentRow?.class === "income"){classSumInc += currentRow.closingBal};
            if(currentRow?.class === "expenses"){classSumExp += currentRow.closingBal};
        }else{    
            //Adding Total Row
            const closingBal = prevRow?.class === "income"? classSumInc : classSumExp;
            fmtRows.push({classTitle:"Total " +convertToTitleCase(prevRow.class), title:"", closingBal, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
            fmtRows.push(emptyRow);

            //Add class Row
            fmtRows.push({class:currentRow.class, classTitle:convertToTitleCase(currentRow.class), title:"", closingBal:"", subClass:currentRow.subClass, rowStyle:"font-bold", emptyRow:true});
        }
        //Add Total Expenses Row
        if(currentRow.class === "expenses" && (!nextRow?.class || nextRow?.class !== "expenses") ){
            fmtRows.push({classTitle:"Total Expenses", title:"", closingBal:classSumExp, subClass:"", rowStyle:"font-bold", classNameTD:true});
            fmtRows.push(emptyRow);

            //Net Income
            fmtRows.push({classTitle:"(Net Profit) or Loss", classTitleName:'NETPROFITORLOSS', title:"", closingBal:classSumInc + classSumExp, subClass:"", rowStyle:"font-bold", emptyRow:true, classNameTD:true});
        }
    }
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