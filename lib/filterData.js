import { sortDates } from "./sortData";



const filterData =(arr, fld, val)=>{

    const validForms = arr.filter((form)=> form[fld] !== "");
    
    const filterRes = fld === 'dob'? filterBirthDay(validForms, val) :
            fld === 'wedAnn'? filterWeddingAnns(validForms, val)  : 
            val === 'Non member'? validForms.filter((form)=> form.memberStat.includes('Non-member')) :
            validForms.filter((form)=> form[fld] === val);
      
      return filterRes;
  }


  function filterBirthDay(valArr, mnth){
        const mnBDay = valArr.filter((form)=> parseInt(form.dob.split('-')[1]) === mnth);
        const res = sortDates(mnBDay);
        return res 
  }



  function filterWeddingAnns(valArr, mnth){
      const mnWedAnn = valArr.filter((form)=> parseInt(form.wedAnn.split('-')[1]) === mnth);
      const res = sortDates(mnWedAnn);
        return res 
  }

  export {filterData}