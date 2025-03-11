function calculateAgeDifference() {
    const birthdate1 = document.getElementById('birthdate1').value;
    const birthdate2 = document.getElementById('birthdate2').value;
    const resultContainer = document.getElementById('result');

    // Validation
    if (!birthdate1 || !birthdate2) {
        resultContainer.innerHTML = 'Please select both birth dates!';
        resultContainer.classList.add('show');
        return;
    }

    const date1 = new Date(birthdate1);
    const date2 = new Date(birthdate2);
    
    // Ensure date1 is the earlier date
    const [earlierDate, laterDate] = date1 < date2 ? [date1, date2] : [date2, date1];

    // Calculate difference
    let years = laterDate.getFullYear() - earlierDate.getFullYear();
    let months = laterDate.getMonth() - earlierDate.getMonth();
    let days = laterDate.getDate() - earlierDate.getDate();

    // Adjust negative values
    if (days < 0) {
        months--;
        const lastMonth = new Date(laterDate.getFullYear(), laterDate.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total days
    const timeDiff = Math.abs(laterDate - earlierDate);
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalMonths = Math.floor(totalDays / 30.44); // Average month length
    const totalYears = Math.floor(totalDays / 365.25); // Accounting for leap years

    // Determine who is older
    const olderPerson = date1 < date2 ? "First person" : "Second person";

    // Display result
    resultContainer.innerHTML = `
        Age Difference: <br>
        ${years} years, ${months} months, and ${days} days <br>
        Total: ${totalDays} days (${totalYears} years, ${totalMonths} months) <br>
        ${olderPerson} is older
    `;
    resultContainer.classList.add('show');
}

// Add enter key support for both inputs
document.querySelectorAll('input[type="date"]').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAgeDifference();
        }
    });
});
