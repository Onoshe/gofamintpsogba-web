


export function sortArrayByKeyAndSubKey(array, keyMain, keySub){
    return array?.sort((x,y)=>{
        if(x[keyMain] === y[keyMain]){
            return x[keySub]?.localeCompare(y[keySub]);
        }else{
            return x[keyMain]?.localeCompare(y[keyMain]);
        }
    });
}