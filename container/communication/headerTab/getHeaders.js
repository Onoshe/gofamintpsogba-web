//import { getPermission } from "../tabsContainer/studentsAttendance/modules/miscFunctions2";


const SENDMAIL = {name: 'SENDMAIL', title:'Send Mail', tabName:'Send Mail'};
const SENDSTATEMENT = {name: 'SENDSTATEMENT', title:'Send Statement', tabName:"Send Statement"};
const SENDMONTHLYSTATEMENT = {name: 'SENDMONTHLYSTATEMENT', title:'Send Monthly Statement', tabName:"Send Monthly Statement"};



const schemas = {
  SENDMAIL: {...SENDMAIL},
  SENDSTATEMENT: {...SENDSTATEMENT},
  SENDMONTHLYSTATEMENT:{...SENDMONTHLYSTATEMENT},
};


const getHeaders =()=>{
    return {...schemas}
}

export default getHeaders