

 
 const sortArray=(arr,order)=>{
         //return order==="as" || order===""? (a.sn - b.sn) : (b.sn - a.sn);
     const validForms = arr.filter((form)=> form[order] !== "");
     const inValidForms = arr.filter((form)=> form[order] === "");
 
     const validRes = order === 'dob'? sortDates(validForms) : sortStrings(validForms, order); 
     return [...validRes, ...inValidForms];
   }
 
 
 const sortStrings=(arr,order)=>{
    var res =[]; 
    if(order==="ARRAY"){
      res =  arr.sort((a, b)=>{
        return a -b
      });
     }else{
        res =  arr.sort((a, b)=>{
          let fa = a[order].toLowerCase(),
              fb = b[order].toLowerCase();
          if(fa < fb){ return -1}
          if(fa > fb){ return 1}
          return  0
      });
     }
 
       return res
   }
 
   const sortArrOfObjs=(arr, key, order)=>{
    const arrCopy = [...arr];
    var res =[]; 

      res =  arrCopy.sort((a, b)=>{
          let fa = a[key]; //  .toLowerCase();
          let fb = b[key];  //.toLowerCase();
             if(fa < fb){ return -1}
            if(fa > fb){ return 1}
            return  0
          });
      if(order === 'desc'){
        return res.reverse()
      }else{ return res}      
  }
 

   const sortDates=(arr)=>{ //Sort date by month
     //const arr = [{name: 'James', dob:'1900-10-5'},{name: 'Bosede', dob:'2005-12-23'},{name: 'Fred', dob:''},{name: 'Abiodun', dob:'1900-1-22'},{name: 'Aina', dob:'1900-12-25'}];
     const arrs = arr.map((form)=>{
         const mnday = form.dob.split('-');
 
         const date = new Date(`2022-${mnday[1]}-${mnday[2]}`);
         return {...form, dobVal: date.valueOf()}
     });
     const sorted = arrs.sort((a,b)=>{ return a.dobVal - b.dobVal})
     sorted.forEach((form)=>{ delete form.dobVal});
     //console.log(sorted);
     return sorted    
   }



   const sortDatesByYrMn=(arr, type)=>{ //Sort date by month

    const sorted = arr.sort((a,b)=>{ 
        const aVal = new Date(a[0].date).valueOf();
        const bVal = new Date(b[0].date).valueOf();
        return aVal - bVal
      });
    if(type==="FROMRECENT"){
        return sorted.reverse()
    }if(type==="FROMOLDEST"){
        return sorted
    }else{return sorted}   
  }

 
   function sortByMembersStatus(arr){
    const ministers = arr.filter((form)=> form.memberStat.toLowerCase() === "minister");
    const nonMinisters = arr.filter((form)=> form.memberStat.toLowerCase() !== "minister");
    const workers = nonMinisters.filter((form)=> form.memberStat.toLowerCase() === "worker");
    const nonWorkers = nonMinisters.filter((form)=> form.memberStat.toLowerCase() !== "worker");

    const dp = [], resPst = [], asstResPst = [],pst=[], elder= [], dcn =[], dcns =[], others=[];
     ministers.forEach((form, i)=>{
      const type = form.title.toLowerCase();
      
       if(type === "District Pastor".toLocaleLowerCase()){ dp.push(form)
       }else if(type === "Resident Pastor".toLocaleLowerCase()){ resPst.push(form)
       }else if(type === "Asst. Resident Pastor".toLocaleLowerCase()){ asstResPst.push(form)
       }else if(type === "Pastor".toLocaleLowerCase()){pst.push(form)
       }else if(type === "Elder".toLocaleLowerCase()) {elder.push(form)
       }else if(type === "Deacon".toLocaleLowerCase()){dcn.push(form)
       }else if(type === "Deaconess".toLocaleLowerCase()){dcns.push(form)
       }else{others.push(form)};
    });

    const res = [...dp, ...resPst, ...asstResPst, ...pst, ...elder, ...dcn, ...dcns, ...others, ...workers, ...nonWorkers];
    return res
   }


  function sortFullDate(array){
      // Turn your strings into dates, and then subtract them 
      function sortFunction(a,b){  
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;  
      }; 
   return array.sort(sortFunction)
  }

 export {sortDates, sortByMembersStatus, sortArrOfObjs, sortDatesByYrMn, sortFullDate}
 export default sortArray
