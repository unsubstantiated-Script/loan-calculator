// Listen for submit

document.getElementById('loan-form').addEventListener('submit', function (e) {
    //hide results
    document.getElementById('results').style.display = "none";

    //show loader
    document.getElementById('loading').style.display = "block";
    setTimeout(calculateResults, 1000);




    e.preventDefault();
});

//Calculate Results
function calculateResults() {
    console.log('Calculating');
    //UI Vars
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');


    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    // Compute Monthly payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.getElementById('results').style.display = "block";
        document.getElementById('loading').style.display = "none";
    } else {
        showError('Please check inputted numbers')
    }
}

//Show Error 
function showError(error) {
    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = "none";
    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')

    //add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading

    card.insertBefore(errorDiv, heading)

    //clear error after 3 seconds

    setTimeout(clearError, 2000);

}

//clear error

function clearError() {
    document.querySelector('.alert').remove();
}