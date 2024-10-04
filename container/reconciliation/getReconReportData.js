import { formatToCurrency } from "@/lib/currency";
import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";

const keys = ['beginningBalGL', 'totalRecepitsGL', 'totalPaymentGL', 'othersGL','endingBalGL',
  'endingBalStmt', 'chequeInTranTotal', 'chequeInTranArr', 'chequeOutTotal', 'chequeOutArr',
  'othersStmt', 'othersStmtArr', 'unreconDiff',      
];

export const getReconReportData =(data, otherDetails, reportDetails, user)=>{
    const {forms, diff, add, less} = otherDetails;
    //reportDetails = {companyName:clientAccount.companyName, asAt:"As at "+reportDt, ledgerName:ledgerAccts.name, ledgerCode:ledgerAccts.accountCode,
    //    title:"Bank Reconciliation", accountTitle:ledgerAccts.accountCode+" "+ledgerAccts.name,
    //  };
    let resultArr = [];
    const chequeInTrans = [];
    const  chequeOut = [];
    const trans = data.data;

    trans?.forEach(tran => {
        const {entryType, checked} = tran;
        if(entryType === "DR" && !checked){
            chequeInTrans.push(tran)
        }
        if(entryType === "CR" && !checked){
            chequeOut.push(tran)
        }
    });

    resultArr.push({desc:'Beginning GL Balance', amount:data.openingCBBal});
    resultArr.push({desc:'Add: Cash Receipt', amount:data.totalDrChk});
    resultArr.push({desc:'Less: Cash Disbursement', amount:-data.totalCrChk});
    resultArr.push({desc:'Add / (Less) Others', amount:data.closingCBBal-(data.openingCBBal + data.totalDrChk -data.totalCrChk)});
    resultArr.push({desc:'Ending GL Balance', amount:data.closingCBBal, classNameTD:'font-bold'});
    resultArr.push({});
    resultArr.push({desc:'Ending Bank Balance', amount:data.closingStmtBal, classNameTD:'font-bold'});
    resultArr.push({desc:'Add back deposits in transit', amount:'', });
    chequeInTrans?.forEach(tran => {
        resultArr.push({ descSub:tran.description, tranNo:tran.transactionNo, amount:parseFloat(tran.amount)});
    });

    resultArr.push({desc:'(Less) outstanding cheques', amount:''});
    chequeOut?.forEach(tran => {
        resultArr.push({ descSub:tran.description,  tranNo:tran.transactionNo, amount:parseFloat(tran.amount)});
    });


    if(Math.abs(data.errorAdj) >0 && forms?.length){
        resultArr.push({desc:'Others'});
        sortArrayByKey(forms, 'DSC');
        let amountNet = 0;
        for (let i = 0; i < forms.length; i++) {
            const form = forms[i];
            let amnt = parseFloat(form.amount);
            amnt = -amnt;
            amountNet += amnt;
            resultArr.push({descSub:form.description, amount:amnt});     
        }
        resultArr.push({desc:'Unreconciled difference', amount:data.errorAdj - amountNet});
    }else{
        resultArr.push({desc:'Unreconciled difference', amount:data.errorAdj});
    }

    resultArr.push({desc:'Ending GL balance', amount:data.closingCBBal, classNameTD:'font-bold'});

    resultArr.push({});
    resultArr.push({});
    resultArr.push({});
    resultArr.push({desc:'Prepared by: '+user.firstname+" "+user.lastname, tranNo:'Reviewed by: '});
    resultArr.push({});
    resultArr.push({desc:'Approved by: '});

    //console.log(otherDetails, data);
 return {rows:resultArr, reportKeys:['desc', 'descSub', 'tranNo', 'amount'], reportDetails, user};
}