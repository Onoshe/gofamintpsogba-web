
export const sortTableData =(array, sortByKey, order)=>{
    
    //Separate valids (keys with value) and invalids (null or undefined keys)
    const validArrs = [];
    const invalidArrs = [];
    let totalObj = {};
    for (let i = 0; i < [...array].length; i++) {
        const el = array[i];
        const isTotal = el?.accountCode?.toLowerCase() === "total" ||el?.productCode?.toLowerCase() === "total";
        if(isTotal){
            totalObj = el;
        }else{
            if(el[sortByKey] && el[sortByKey] != "" && el[sortByKey] != undefined && el[sortByKey] != null){
                validArrs.push(el)
            }else{
                invalidArrs.push(el)
            }
        }
    }
    //console.log(array)
    //return [validArrs, invalidArrs]
    let result = [...validArrs];
    sortData(result, sortByKey, order);
    return totalObj?.accountCode || totalObj?.productCode? [...result, ...invalidArrs, totalObj] : [...result, ...invalidArrs];
}


function sortData(data, sortByKey, order){
   return  data.sort((a, b) => {

        const valA = order === "ASC"? b[sortByKey] : a[sortByKey]; //a[key]
        const valB = order === "ASC"? a[sortByKey] : b[sortByKey];

        // Handle null or undefined: move to the bottom
        //if (valA == null && valB == null) return 0; // Both are null/undefined
        //if (valA == null) return 1; // valA goes to the bottom
        //if (valB == null) return -1; // valB goes to the bottom

        // Handle numbers
        if (typeof valA === "number" && typeof valB === "number") {
            return valB - valA;
        }

        // Handle strings
        if (typeof valA === "string" && typeof valB === "string") {
            return valA.localeCompare(valB);
        }

        // Handle dates
        const dateA = new Date(valA);
        const dateB = new Date(valB);
        if (!isNaN(dateA) && !isNaN(dateB)) {
            return dateA - dateB;
        }

        // Default case: convert to strings and compare
        return String(valA).localeCompare(String(valB));
    });
}

// Example usage
const data = [
    { name: "Alice", age: 30, no:'-23', joined: "2022-01-15" },
    { name: "Bob", age: 25, no:'-55', joined: "2023-03-10" },
    { name: null, age: 40, no:'', joined: "2021-05-25" },
    { name: "Eve", age: 35, no:'-63', joined: "" },
];

//console.log(sortTableData(data, "name"));
//console.log(sortTableData(data, "age"));
//console.log(sortTableData(data, "joined"));
//console.log(sortTableData(data, "no"));