const docHeader  = [
    ["A very long long header"],
    ["Name", "Age", "Location"],
    ["John Doe", 29, "New York"],
    ["Jane Smith", 32, "London"]
];
let ws = {A1:{}, A2:{}, A3:{}};
const borderCellStyle = {
    border: {
        //top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
    }
};

const presummedColsLen = 3;
const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
/*/ Apply style to headers
for (let i = 0; i < docHeader?.length; i++) {
    if(ws[`A${i + 1}`]){
        ws[`A${i + 1}`].s = headerCellStyle;
    }
}*/
//Apply borders to header
for (let i = 1; i < docHeader.length; i++) {
    let row = i;
    const cols = Array(presummedColsLen).fill(0).map((_,k)=> columns[k]);
    //console.log(cols)
    for (let j = 0; j < cols?.length; j++) {
        const col = cols[j];
        const cell = `${col}${row}`;
        if(ws[cell]){
            ws[cell].s = borderCellStyle;
        }
    }
}
//console.log(ws);
/*
for (let j = 0; j < docHeader?.length; j++) {
        if(ws[`A${i + 1}`]){
            ws[`A${i + 1}`].s = headerCellStyle;
        }
        
    }
        */
    var cols = Array(9).fill(0).map((_,k)=> k+1);
    function getExcelColumnLabel(columnNumber) {
        let label = '';
        let remainder;
        
        while (columnNumber > 0) {
            remainder = (columnNumber - 1) % 26;
            label = String.fromCharCode(65 + remainder) + label;
            columnNumber = Math.floor((columnNumber - 1) / 26);
        }
        
        return label;
    }

const num = 3.14459;
// Rounds to 2 decimal places
//const roundedNum = Math.round(num * 100) / 100; 
//console.log(roundedNum); // Output: 3.14
//const roundedNumFloor = Math.floor(num * 100) / 100;
//console.log(roundedNumFloor); // Output: 3.14
//const roundedNumCeil = Math.ceil(num * 100) / 100;
//console.log(getExcelColumnLabel(13)); // Output: 3.14

function productCodeTest(str) {
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(str);
  }
  
//console.log(productCodeTest('TAD230S'))  
const path = "first/demo/reports";
const [firstPart, ...rest] = path.split('/'); // split by /
const result = [firstPart, rest.join('/')]; // combine the rest if there are multiple parts


function splitByFirstChar(str, char){
    const splitChar = char || '=';
    const [firstPart, ...rest] = str.split(splitChar); // split by 
    const result = [firstPart, rest.join(splitChar)]; // combine the rest if there are multiple parts
    return  result
}

//const str = "/demo/reports";
//console.log(splitByFirstChar(str))

function getStartAndEndDate(period) {
    const now = new Date(); // current date and time
    let startDate, endDate;

    
    switch (period?.toUpperCase()) {
        case 'TODAY':
            startDate = new Date().toISOString().split('T')[0]; // today's date
            endDate = new Date().toISOString().split('T')[0]; // today's date
            break;

            case 'THIS-WEEK':
                startDate = new Date();
                startDate.setDate(now.getDate() - now.getDay()); // start of the current week (Sunday)
                startDate = startDate.toISOString().split("T")[0];
                endDate = new Date(now).toISOString().split('T')[0]; // current date
                break;
    
            case 'LAST-WEEK':
                startDate = new Date(now);
                startDate.setDate(now.getDate() - now.getDay() - 7); // start of the previous week (Sunday)
                endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6); // end of the previous week (Saturday)
                startDate = startDate.toISOString().split("T")[0];
                endDate = endDate.toISOString().split("T")[0];
                break;

        case 'THIS-MONTH':
            const thMn = new Date().getMonth()+1 < 10? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
            startDate = `${new Date().getFullYear()}-${thMn}-01` // start of the current month
            endDate = new Date(now).toISOString().split('T')[0]; // current date
            break;

        case 'LAST-MONTH':
            let lmDate = new Date();
            lmDate.setDate(0);
            const lsMn = new Date().getMonth()+1 < 10? '0'+(new Date().getMonth()) : new Date().getMonth()+1;
            startDate = `${new Date().getFullYear()}-${lsMn}-01`; // start of the previous month
            endDate = `${lmDate.toISOString().split("T")[0]}`; // end of the previous month
            break;

        case 'THIS-QUARTER':
            const currentQuarterStartMonth = Math.floor(new Date().getMonth() / 3) * 3;
            startDate = new Date(now.getFullYear(), currentQuarterStartMonth, 1).toISOString().split('T')[0]; // start of the current quarter
            endDate = new Date().toISOString().split('T')[0]; // current date
            break;

        case 'LAST-QUARTER':
            const lastQuarterStartMonth = Math.floor((new Date().getMonth() - 3) / 3) * 3;
            startDate = new Date(now.getFullYear(), lastQuarterStartMonth, 1).toISOString().split('T')[0]; ; // start of the previous quarter
            endDate = new Date(now.getFullYear(), lastQuarterStartMonth + 3, 0).toISOString().split('T')[0]; ; // end of the previous quarter
            break;

        case 'THIS-YEAR':
            startDate = `${new Date().getFullYear()}-01-01`; // start of the current year
            endDate = new Date().toISOString().split('T')[0]; // current date
            break;

        case 'LAST-YEAR':
            startDate = `${new Date().getFullYear()-1}-01-01`; // start of the previous year
            endDate = `${new Date().getFullYear()-1}-12-31`; // end of the previous year
            break;

        case 'FIRST-HALF-OF-THE-YEAR':

            startDate = `${new Date().getFullYear()}-01-01`; // start of the year
            endDate = `${new Date().getFullYear()}-06-30`;; // June 30th or now, whichever is earlier
            break;

        default: // From the beginning of the year till now
            startDate = `${new Date().getFullYear()}-01-01`;
            endDate = new Date().toISOString().split('T')[0]; // current date
    }
     // Ensure the dates are correct by resetting the time to midnight for consistency
     //startDate.setHours(0, 0, 0, 0);
     //endDate.setHours(0, 0, 0, 0);
 
     // Format the dates to YYYY-MM-DD
     //startDate = startDate.toISOString().toISOString().split('T')[0];
     //endDate = endDate.toISOString().toISOString().split('T')[0];
 
     return { startDate, endDate, period: period || 'DEFAULT' };
 }
 
/*
// Example usage:
 console.log(getStartAndEndDate('TODAY'));
 console.log(getStartAndEndDate('THIS-WEEK'));
 console.log(getStartAndEndDate('LAST-WEEK'));
 console.log(getStartAndEndDate('THIS-MONTH'));
 console.log(getStartAndEndDate('LAST-MONTH'));
 console.log(getStartAndEndDate('THIS-QUARTER'));
 console.log(getStartAndEndDate('LAST-QUARTER'));
 console.log(getStartAndEndDate('THIS-YEAR'));
 console.log(getStartAndEndDate('LAST-YEAR'));
 console.log(getStartAndEndDate('FIRST-HALF-OF-THE-YEAR'));
 console.log(getStartAndEndDate(''));*/

 let subHistory = [{name:'Sub1', subscriptionDate:'2023-03-01'}, {name:'Sub1', subscriptionDate:'2023-05-21'}]
 subHistory = subHistory?.map((dt, i)=> {
    const todayDate = new Date();
    const todayTime = todayDate.getTime();
    const subDate = new Date(dt.subscriptionDate);
    const subDateStr = subDate.toDateString();
    const subDueDate = new Date(dt.subscriptionDate);
        subDueDate.setDate(subDate.getDate() + 366);
    const subDueDateStr = new Date(subDueDate).toDateString();
    const subDueDateTime = subDueDate.getTime();
    const active = subDueDateTime > todayTime;
    //if(i===0){subActive = active}
    return {...dt, subDateStr, subDueDateStr, active}
});
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate()+1);

console.log(subHistory);