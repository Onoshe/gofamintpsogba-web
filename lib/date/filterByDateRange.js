export function filterByDateRange(dataArray, beginDate, endDate, dateProperty) {
    // Convert the beginning and ending dates to Date objects
    const startDate = new Date(beginDate);
    const finishDate = new Date(endDate);

    // Filter the array
    return dataArray.filter(item => {
        // Convert the item's date to a Date object
        const itemDate = new Date(item[dateProperty]);

        // Check if the item's date is within the specified range
        return itemDate >= startDate && itemDate <= finishDate;
    });
}