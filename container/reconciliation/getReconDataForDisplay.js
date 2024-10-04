


export const getReconDataForDisplay =(data, closingStmtBal=0, openingCBBal=0)=>{
    let result = {data, transCount:0, transCountDr:0, transCountCr:0, totalDr:0, totalCr:0, totalNet:0,
        transCountDrChk:0, transCountCrChk:0, totalDrChk:0, totalCrChk:0, totalNetChk:0,
        closingStmtBal:parseFloat(closingStmtBal) || 0, openingCBBal:parseFloat(openingCBBal) ||0, closingCBBal:0, chequeOut:0, chequeInTran:0,reconTotal:0,errorAdj:0,stmtClPlusRecon:0,
     };
     if(data?.length){
        for (let i = 0; i < data.length; i++) {
            result.transCount += 1;
            const {amount, debit, credit, checked} = data[i];
            if(debit){
                result.transCountDr += 1;
                result.totalDr += debit;
                result.totalNet += debit; 
                if(checked){
                    result.transCountDrChk += 1;
                    result.totalDrChk += debit;
                    result.totalNetChk += debit;
                }
            }
            if(credit){
                result.transCountCr += 1;
                result.totalCr += credit;
                result.totalNet -= credit;
                if(checked){
                    result.transCountCrChk += 1;
                    result.totalCrChk += credit;
                    result.totalNetChk -= credit;
                }
            }
        }
     }
     result.closingCBBal = openingCBBal + result.totalNet;
     result.chequeOut = result.totalCrChk -  result.totalCr;
     result.chequeInTran =  result.totalDr - result.totalDrChk;

     result.stmtClPlusRecon = (result.closingStmtBal + result.chequeOut + result.chequeInTran);
     result.errorAdj = result.closingCBBal - result.stmtClPlusRecon; 
     result.reconTotal = result.stmtClPlusRecon + result.errorAdj;

    return result
}
