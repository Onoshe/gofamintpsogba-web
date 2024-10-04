
export function getShortDate(el){
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //date=> '2022-05-23'
    //const dates = '2023-01-10';
    const d = el? new Date(el) : new Date();
    const day = d.getDay();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const shortDateArr = [days[day], date, months[month], year];
    //return `${shortDate[0]} ${shortDate[2]} ${shortDate[1]} ${shortDate[3]}`
    // getShortDate('2023-01-25') => [ 'Wed', 25, 'Jan', 2023 ]
    return {short:`${date}-${months[month]}-${year}`, arr:shortDateArr}
}

function getShortDateFull(val){
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //date=> '2022-05-23'
    //const dates = '2023-01-10';
    const d = val? new Date(val) : new Date();
    const day = d.getDay();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const hrs = d.getHours();
    const mins = d.getMinutes();
    const secs = d.getSeconds();
    const shortDateArr = [year, months[month], date, days[day], hrs, mins, secs ];
    // returns: [ 2023, 'Jan', 25, 'Wed', 'hr', 'mins', 'sec' ]
    return shortDateArr
}


export function getLongMonth(el){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
    const d = el? new Date(el) : new Date();

    const day = d.getDay(); //5- Friday Number
    const month = d.getMonth();
    const year = d.getFullYear();

    return {fullMonth:`${day} ${months[month]}, ${year}`}
}