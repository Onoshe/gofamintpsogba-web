export const aoaToObj =(arrs)=>{
    const row1 = arrs[0];
    const keys = row1.map((e, i)=>{
        const key = !e || e === null || e === "" || e === undefined? 'col_'+(i+1) : e.trim();
        return key?.toString()
    });
    return combineArrays(keys, arrs.slice(1));
}

export function combineArrays(keys, dataArray) {
    return dataArray.map(innerArray => {
        return keys.reduce((obj, key, index) => {
            obj[key] = innerArray[index]? (typeof innerArray[index] === "string"? innerArray[index].trim() : key.toLowerCase().includes("amount")?  innerArray[index] : innerArray[index].toString().trim()) : "";
            return obj;
        }, {});
    });
}


//Before: obj[key] = typeof innerArray[index] === "string"? innerArray[index].trim() : key.toLowerCase().includes("amount")?  innerArray[index] : innerArray[index].toString().trim());