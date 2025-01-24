
function getDateString(type, dt){
    const nowDate = dt? new Date(dt) : new Date();
    const todayStr = nowDate.toDateString();
    const date = nowDate.getDay();
    const mnth = nowDate.getMonth();
    const yr = nowDate.getFullYear();

    var returnedVal;
    switch(type) {
        case type ='TODAYMNYR':
            {   const dateStr = `${monthsStr[mnth]}, ${yr}`;
                returnedVal = dateStr; 
                break
            }
        
        default:
          returnedVal = todayStr;
      }
      return returnedVal


}


const monthsStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct","Nov","Dec"];
//const birthDay=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function sanityDateTimeFormat() {
    const date = new Date();
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
      ].join(':')
    );
  }


  function sanityDateFormat() {
    const date = new Date();
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-')
    );
  }

export  {getDateString, sanityDateTimeFormat, sanityDateFormat}