window.onload = function() {

const ac = document.querySelector('.button.operator-btn.ac');
const point = document.querySelector('.button.point');
const equal = document.querySelector('.button.operator-btn.equal');

let resultBox = document.querySelector('#result-box');
const buttons = document.querySelectorAll('.button')

ac.addEventListener('click', () => {
    resultBox.textContent = '0';
    isStartingState = true;
    valuesArray = [];
    operatorArray = [];
})
 
let isStartingState = true;
let valuesArray = [];
let operatorArray = [];


buttons.forEach( button => {   
    button.addEventListener('click', () => {

        styleChange(button);

        if(!button.classList.contains('operator-btn') ) {
            buttonNumberIsClicked(button);          
        }

        if(button.classList.contains('operator-btn') && button !== ac ) { // or.. !button.classList.contains('ac') 
            buttonOperatorIsClicked(button);
        }        

    })
});

function styleChange (button) {   
    button.style.boxShadow = 'inset 6px 6px 11px #383453, inset -6px -6px 4px #6a5bbd';

    setTimeout( () => {
        button.style.boxShadow = '6px 6px 11px #2a273e, -6px -6px 8px  #584ba3';
    }, '300');
};

function buttonNumberIsClicked (button) {
    if( isStartingState == true) 
        resultBox.textContent = '';

    if( button == point && resultBox.textContent.includes('.')) 
        return;
                    
    resultBox.textContent += button.textContent; 
    isStartingState = false; 
};

function buttonOperatorIsClicked (button) {
    valuesArray.unshift(resultBox.textContent);      //unshift() pushes a new element at the begging of an array
    operatorArray.unshift(button.textContent);

    console.log(valuesArray);
    console.log(operatorArray);

    resultBox.textContent = '';

    if(button == equal) {
        operatorArray.shift();                       //shift() method removes the first element from an array
        console.log('the last operatorsArray__' + operatorArray);
        operate();
    }
};

function operate () {
    while (valuesArray.length > 1) {

        let number1 = parseFloat(valuesArray.pop());
        console.log('number1=' + number1);
        let number2 = parseFloat(valuesArray.pop());
        console.log('number2=' + number2);

        let operator1 = operatorArray.pop();
        console.log('operator1=' + operator1);

        let numberAfterOperation = operateSwitch(operator1, number1, number2);
        console.log('numberAfterOperation=' + numberAfterOperation);

        resultBox.textContent = numberAfterOperation;
        valuesArray.push(numberAfterOperation);
    }
};

function operateSwitch(operator1, number1, number2) {
    switch (operator1) {
    case '+':
        return add(number1, number2);
    case '-':
        return subtract(number1, number2);
    case '*':
        return multiply(number1, number2);
    case '/':
        return divide(number1, number2);
    case '%':
        return percent (number1, number2);
    default:
        console.log('Something went wrong!..')
    }
};

function add(number1, number2) {
    return number1 + number2;
};

function subtract(number1, number2) {
    return number1 - number2;
};

function multiply(number1, number2) {
    return number1 * number2;
};

function divide(number1, number2) {
    if(number2 == '0')
        return "That can't be right...";
    return number1 / number2;
};

function percent (number1, number2) {
    let decimal = number1/100;
    return decimal * number2;
};


}