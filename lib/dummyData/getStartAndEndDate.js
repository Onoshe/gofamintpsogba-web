function getStartAndEndTodayDate(period) {
    const now = new Date();
    let dates = {};

    dates.today = now;
    dates.thisWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    dates.lastWeekStart = new Date(now.setDate(now.getDate() - now.getDay() - 7));
    dates.lastWeekEnd = new Date(now.setDate(dates.lastWeekStart.getDate() + 6)); // Adjust end date to last week's Saturday
    dates.thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    dates.lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    dates.lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the previous month
    dates.currentQuarterStart = Math.floor((now.getMonth() + 3) / 3);
    dates.currentQuarterEnd = new Date(now.getFullYear(), (dates.currentQuarterStart - 1) * 3, 1);
    const lastQuarter = Math.floor((now.getMonth() + 3) / 3) - 1;
    dates.lastQuarterStart = new Date(now.getFullYear(), (lastQuarter - 1) * 3, 1);
    dates.lastQuarterEnd = new Date(now.getFullYear(), lastQuarter * 3, 0); // Last day of the last quarter
    dates.thisYear = new Date(now.getFullYear(), 0, 1);
    dates.lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
    dates.lastYearEnd = new Date(now.getFullYear() - 1, 11, 31); // Last day of the previous year
    dates.halfYearStart = new Date(now.getFullYear(), 0, 1);
    dates.halfYearEnd = new Date(Math.min(now.getTime(), new Date(now.getFullYear(), 5, 30).getTime())); // End of June or now
           
    // Format the dates to YYYY-MM-DD
   // startDate = startDate.toISOString().split('T')[0];
   // endDate = endDate.toISOString().split('T')[0];

    return dates;
}

function getStartAndEndDateOld(period) {
    const now = new Date();
    let startDate, endDate;

    switch (period.toLowerCase()) {
        case 'TODAY':
            startDate = endDate = now;
            break;

        case 'THIS-WEEK':
            startDate = new Date(now.setDate(now.getDate() - now.getDay()));
            endDate = new Date(now.setDate(startDate.getDate() + 6));
            break;

        case 'LAST-WEEK':
            startDate = new Date(now.setDate(now.getDate() - now.getDay() - 7));
            endDate = new Date(now.setDate(startDate.getDate() + 6));
            break;

        case 'THIS-MONTH':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;

        case 'LAST-MONTH':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), 0);
            break;

        case 'THIS-QUARTER':
            const currentQuarter = Math.floor((now.getMonth() + 3) / 3);
            startDate = new Date(now.getFullYear(), (currentQuarter - 1) * 3, 1);
            endDate = new Date(now.getFullYear(), currentQuarter * 3, 0);
            break;

        case 'LAST-QUARTER':
            const lastQuarter = Math.floor((now.getMonth() + 3) / 3) - 1;
            startDate = new Date(now.getFullYear(), (lastQuarter - 1) * 3, 1);
            endDate = new Date(now.getFullYear(), lastQuarter * 3, 0);
            break;

        case 'THIS-YEAR':
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear(), 11, 31);
            break;

        case 'LAST-YEAR':
            startDate = new Date(now.getFullYear() - 1, 0, 1);
            endDate = new Date(now.getFullYear() - 1, 11, 31);
            break;

        case 'FIRST-HALF-OF-THE-YEAR':
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear(), 5, 30);
            break;

        default: //From beginning of the year till now
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date();
    }

    // Format the dates to YYYY-MM-DD
    startDate = startDate.toISOString().split('T')[0];
    endDate = endDate.toISOString().split('T')[0];

    return { startDate, endDate };
}

export function isDateRangeGreaterThanYear(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000; // milliseconds in a year

    const dateDifference = end - start;

    return dateDifference > oneYearInMilliseconds;
}

export function getStartAndEndDate_Former(period) {
    const now = new Date(); // current date and time
    let startDate, endDate;

    switch (period?.toUpperCase()) {
        case 'TODAY':
            startDate = new Date(now); // today's date
            endDate = new Date(now); // today's date
            break;

        case 'THIS-WEEK':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDay()); // start of the current week (Sunday)
            endDate = new Date(now); // current date
            break;

        case 'LAST-WEEK':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDay() - 7); // start of the previous week (Sunday)
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // end of the previous week (Saturday)
            break;

        case 'THIS-MONTH':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // start of the current month
            endDate = new Date(now); // current date
            break;

        case 'LAST-MONTH':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // start of the previous month
            endDate = new Date(now.getFullYear(), now.getMonth(), 0); // end of the previous month
            break;

        case 'THIS-QUARTER':
            const currentQuarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
            startDate = new Date(now.getFullYear(), currentQuarterStartMonth, 1); // start of the current quarter
            endDate = new Date(now); // current date
            break;

        case 'LAST-QUARTER':
            const lastQuarterStartMonth = Math.floor((now.getMonth() - 3) / 3) * 3;
            startDate = new Date(now.getFullYear(), lastQuarterStartMonth, 1); // start of the previous quarter
            endDate = new Date(now.getFullYear(), lastQuarterStartMonth + 3, 0); // end of the previous quarter
            break;

        case 'THIS-YEAR':
            startDate = new Date(now.getFullYear(), 0, 1); // start of the current year
            endDate = new Date(now); // current date
            break;

        case 'LAST-YEAR':
            startDate = new Date(now.getFullYear() - 1, 0, 1); // start of the previous year
            endDate = new Date(now.getFullYear() - 1, 11, 31); // end of the previous year
            break;

        case 'FIRST-HALF-OF-THE-YEAR':
            startDate = new Date(now.getFullYear(), 0, 1); // start of the year
            endDate = new Date(Math.min(now.getTime(), new Date(now.getFullYear(), 5, 30).getTime())); // June 30th or now, whichever is earlier
            break;

        default: // From the beginning of the year till now
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now); // current date
    }

    // Format the dates to YYYY-MM-DD
    startDate = startDate.toISOString().split('T')[0];
    endDate = endDate.toISOString().split('T')[0];

    return { startDate, endDate, period:period || 'DEFAULT' };
}


export function getStartAndEndDate(period) {
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


