
/******************** VALID CONDITIONS 
1. Minimum length of 6
2. Maximum length of 15
3. Must begin with any digit between 1 - 9  

*/

const { validate } = require("uuid");

const regex = /^[1-9][0-9-A-Za-z]{5,15}$/;


export const validateCOACode =(code)=>{
    return regex.test(code)
}

//console.log(regex.test("12359fjfhf"));
//console.log(regex.test("12359- "));
//console.log(regex.test("012359"));
//console.log(regex.test("12359-fjfhf"));