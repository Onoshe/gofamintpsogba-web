
const allocateAccountIds =(forms, chartOfAccounts, personalAccounts)=>{
   if(forms?.length) return
   
   return forms.map((acct)=>{
        if(acct?.debitAccount){
            const coa = chartOfAccounts.find(dt=> dt.accountCode === acct.debitAccount);
            if(coa?.id){
                const {typeCode} = coa;
                acct.id = coa.id //assign id to debitAccount

                if(acct.debitSub){

                }
            }
            
        }
        if(acct?.creditAccount){
            const coa = chartOfAccounts.find(dt=> dt.accountCode === acct.creditAccount);
            if(coa?.id){
                acct.id = coa.id
            }
        }
        

    });
}