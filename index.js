document.querySelector('.btn').addEventListener('click', (e) => calculate(e));
const presentDate = new Date();
const countingAge = (birthDate) => {
    const bDate = birthDate;

    let yearDiff = presentDate.getFullYear() - bDate.getFullYear();
    let monthDiff = presentDate.getMonth() - bDate.getMonth();
    let dayDiff = presentDate.getDate() - bDate.getDate();

//handle number of month, if bDay isn't come in this year
    (monthDiff < 0 || monthDiff === 0 && dayDiff < 0) ? --yearDiff : null;
    monthDiff < 0 ? monthDiff += 12 : null;

//handle number of days and month, if bDay date is bigger than a present day
    if (dayDiff < 0) {
        let d1 = bDate.getDate();
        bDate.setMonth(presentDate.getMonth() + 1, 0);
        dayDiff = bDate.getDate() - d1 + presentDate.getDate();
        --monthDiff;
    }

    document.getElementById("years").innerText = yearDiff;
    document.getElementById("months").innerText = monthDiff;
    document.getElementById("days").innerText = dayDiff;

    // document.getElementById("years").classList.add('submit');
    // document.getElementById("months").innerText = monthDiff;
    // document.getElementById("days").innerText = dayDiff;

}

//short handle for adding error classes

const setErrors = () => {
    document.querySelectorAll('label').forEach((el)=>el.classList.add('error'));
    document.querySelectorAll('input').forEach((el)=>el.classList.add('error'));

}
const unSetErrors = ()=>{
    document.querySelectorAll('label').forEach((el)=>el.classList.remove('error'));
    document.querySelectorAll('input').forEach((el)=>el.classList.remove('error'));
}
const calculate = (e) => {
    e.preventDefault();
    let errorY;
    let errorM;
    let errorD;
    const loMnths = [4, 6, 9, 11];
    const yearPatten = new RegExp('[0-9]{4}');
    const bDay = document.getElementById('bDay').value;
    const bMonth = document.getElementById('bMonth').value;
    const bYear = document.getElementById('bYear').value;


    const bDate = new Date(`${bYear}-${bMonth}-${bDay}`);

    const yearErrorField = document.getElementById('yearError');
    const monthErrorField = document.getElementById('monthError');
    const dayErrorField = document.getElementById('dayError');

    //handle Year errors
    if (!bYear || !yearPatten.test(bYear)) {
        yearErrorField.innerText = 'This field is required';
        yearErrorField.style = 'visibility: visible';
        errorY = true;
    } else if (bYear > presentDate.getFullYear() || bDate > presentDate) {
        yearErrorField.innerText = 'Must be in the past';
        yearErrorField.style = 'visibility: visible';
        errorY = true;
    } else if (bYear <= presentDate.getFullYear()) {
        yearErrorField.innerText = '----';
        yearErrorField.style = 'visibility: hidden';
        errorY = false;
        unSetErrors();
    }

    //handle month errors
    if (bMonth > 0 && bMonth < 13) {
        monthErrorField.innerText = '----';
        monthErrorField.style = 'visibility: hidden';
        errorM = false;
        unSetErrors();
    } else if (!bMonth) {
        monthErrorField.innerText = 'This field is required';
        monthErrorField.style = 'visibility: visible';
        errorM = true;
    } else if (bMonth > 12 || bMonth < 1) {
        monthErrorField.innerText = 'Must be a valid month';
        monthErrorField.style = 'visibility: visible';
        errorM = true;
    }

    //handle days errors
    if (!bDay) {
        dayErrorField.innerText = 'This field is required';
        dayErrorField.style = 'visibility: visible';
        errorD = true;
    } else if (bDay > 31 || bDay <= 0) {
        dayErrorField.innerText = 'Must be a valid day';
        dayErrorField.style = 'visibility: visible';
        errorD = true;
    } else if (loMnths.includes(parseInt(bMonth)) && bDay > 30 || bMonth == 2 && bDay > 29) {
        dayErrorField.innerText = 'Must be a valid date';
        dayErrorField.style = 'visibility: visible';
        errorD = true;
    } else {
        dayErrorField.innerText = '----';
        dayErrorField.style = 'visibility: hidden';
        errorD = false;
        unSetErrors();
    }


    !(errorY || errorD || errorM) ? countingAge(bDate) : setErrors();

}



