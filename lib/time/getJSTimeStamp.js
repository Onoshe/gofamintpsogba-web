
function getCurrentDateTime(date) {
    const now = date? new Date(date) : new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(now.getDate()).padStart(2, '0'); // Adding leading zero if needed
    const hours = String(now.getHours()).padStart(2, '0'); // Adding leading zero if needed
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Adding leading zero if needed
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Adding leading zero if needed

    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateTimeString;
}

// Example usage
//const currentDateTime = getCurrentDateTime();
//console.log(String(1234));

export {getCurrentDateTime}