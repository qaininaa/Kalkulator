const container = document.querySelector('.container');
const display = document.querySelector('#numberOperation');
let currentInput = '';
let currentOperation = '';
let storedValue = '';

document.addEventListener('DOMContentLoaded', function() {
    container.addEventListener('click', function(e) {
        if (e.target.matches('.button')) {
            handleNumber(e.target.value);
        } else if (e.target.matches('.bOperation')) {
            handleOperation(e.target);
        }
    });
});

function handleNumber(value) {
    currentInput += value;
    display.textContent = currentInput;
}

function handleOperation(button) {
    const operation = button.classList.contains('clear') ? 'clear' : 
                      button.classList.contains('equal') ? 'equal' : 
                      button.classList.contains('plus') ? '+' :
                      button.classList.contains('minus') ? '-' :
                      button.classList.contains('dividedBy') ? '/' :
                      button.classList.contains('modulus') ? '%' :
                      button.classList.contains('times') ? '*' : 
                      button.classList.contains('power') ? '**' : '';

    if (operation === 'clear') {
        clearAll();
    } else if (operation === 'equal') {
        calculateResult();
    } else {
        setOperation(operation);
    }
}

function clearAll() {
    currentInput = '';
    storedValue = '';
    currentOperation = '';
    display.textContent = '';
}

function setOperation(operation) {
    if (currentInput === '') return;
    if (currentOperation !== '') calculateResult();

    storedValue = currentInput;
    currentInput = '';
    currentOperation = operation;
}

function calculateResult() {
    if (currentInput === '' || storedValue === '') return;

    let result;
    const a = parseFloat(storedValue);
    const b = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
        case '%':
            result = a % b;
            break;
        case '**':
            result = a ** b;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    storedValue = '';
    currentOperation = '';
    display.textContent = currentInput;
}
