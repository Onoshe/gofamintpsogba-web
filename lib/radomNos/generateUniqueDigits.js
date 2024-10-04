

export function generateUniqueDigits(str, byNo){
    //The unique ID will be valid across time and space
    const multiplier = isNaN(byNo)? 10000000000 : parseInt(byNo);
    const num =  Math.floor(Date.now() + Math.random() * multiplier);
    return str? num.toString() : num
}

//console.log(generateUniqueDigits('str'));