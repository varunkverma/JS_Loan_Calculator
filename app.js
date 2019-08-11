//Listen to submit
document.querySelector('#loan-form').addEventListener('submit',function(e)
{
    //Hide Results
    document.querySelector('#results').style.display='none';

    //show loader
    document.querySelector('#loading').style.display='block';

    setTimeout(calculateResults,2000);
    e.preventDefault();
});


//Calulate Results
function calculateResults()
{
    //UI variables
    const amount=document.querySelector('#amount');
    const interest=document.querySelector('#interest');
    const years=document.querySelector('#years');
    const monthlyPayment=document.querySelector('#monthly-payment');
    const totalPayment=document.querySelector('#total-payment');
    const totalInterest=document.querySelector('#total-interest');

    const principle=parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment
    const x=Math.pow(1 + calculatedInterest,calculatedPayments);
    const monthly=(principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly))
    {
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly * calculatedPayments).toFixed(2);
        totalInterest.value=((monthly*calculatedPayments)-principle).toFixed(2);

        //Hide loader
        document.querySelector('#loading').style.display='none';
        //Show Results
        document.querySelector('#results').style.display='block';
    }
    else
    {
        //Hide loader and results
        document.querySelector('#loading').style.display='none';
        document.querySelector('#results').style.display='none';
        showError('Please check your numbers');
    }
    
    
}

function showError(error)
{
    //Create a div element
    const errorDiv=document.createElement('div');

    //Get Elements
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');

    //Add class to div
    errorDiv.className='alert alert-danger';

    //Create textNode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert errorDiv in card
    card.insertBefore(errorDiv,heading);
    console.log(errorDiv)
    //Clear after 3 seconds
    setTimeout(clearError,3000);
}

function clearError()
{
    document.querySelector('.alert').remove();
}

