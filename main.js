
function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    // Helper function to parse the date string into a Date object
    function parseDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    // Helper function to calculate working days excluding Fridays in a month
    function getWorkingDaysInMonth(year, month) {
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0); // Last day of the month
        let workingDays = 0;

        for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
            if (day.getDay() !== 5) { // 5 corresponds to Friday
                workingDays++;
            }
        }
        return workingDays;
    }

    // Calculate the range of dates
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    let totalDaysWorked = 0;

    // Iterate through each month in the date range
    for (let year = startYear; year <= endYear; year++) {
        const startMonth = year === startYear ? start.getMonth() : 0;
        const endMonth = year === endYear ? end.getMonth() : 11;

        for (let month = startMonth; month <= endMonth; month++) {
            const daysInMonth = getWorkingDaysInMonth(year, month);
            daysExcludingFridays.push(daysInMonth);

            // Calculate worked days within the start and end dates
            const monthStart = (year === startYear && month === startMonth) ? start : new Date(year, month, 1);
            const monthEnd = (year === endYear && month === endMonth) ? end : new Date(year, month + 1, 0);

            let workedDays = 0;

            for (let day = new Date(monthStart); day <= monthEnd; day.setDate(day.getDate() + 1)) {
                if (day.getDay() !== 5) { // Exclude Fridays
                    workedDays++;
                }
            }
            daysWorkedExcludingFridays.push(workedDays);
            totalDaysWorked += workedDays;
        }
    }

    // Calculate monthly targets
    const monthlyTargets = daysWorkedExcludingFridays.map((workedDays, index) => {
        return (workedDays / totalDaysWorked) * totalAnnualTarget;
    });

    // Calculate total target based on worked days
    const totalTarget = monthlyTargets.reduce((sum, target) => sum + target, 0);

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
}

// Example usage
const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(result);
