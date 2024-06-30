const mainScreen = document.getElementById('main-screen');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let equation = '';
let shouldResetScreen = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            currentInput = '';
            equation = '';
            updateScreen('');
        } else if (value === 'D') {
            if (currentInput !== '') {
                currentInput = currentInput.slice(0, -1);
                equation = equation.slice(0, -1);
                updateScreen(equation);
            }
        } else if (value === '=') {
            if (currentInput !== '') {
                try {
                    const result = eval(equation).toString();
                    updateScreen(`${equation} = ${result}`);
                    currentInput = result;
                    equation = result;
                    shouldResetScreen = true;
                } catch {
                    updateScreen('Error');
                    currentInput = '';
                    equation = '';
                }
            }
        } else {
            if (shouldResetScreen) {
                currentInput = '';
                equation = '';
                shouldResetScreen = false;
            }
            currentInput += value;
            equation += value;
            updateScreen(equation);
        }
    });
});

function updateScreen(value) {
    mainScreen.value = value;
}
