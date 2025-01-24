//' use client'

function generateRandomBetween(start, end){
    var arr = [];
        for(var i=start; i<= end; i++) {
           arr.push(i);
        }
    const len = arr.length;
    const random = Math.floor(Math.random() * len); //Returns 0 - len
    return arr[random]
}

export default generateRandomBetween;

