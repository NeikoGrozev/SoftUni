function solve() {

    const input = document.getElementById('expressionOutput');
    const result = document.getElementById('resultOutput');
   
    const memory = {
        firstDigit: '',
        secondDigit: '',
        operator: ''
    };


    let operators = {
        '+': () => Number(memory.firstDigit) + Number(memory.secondDigit),
        '-': () => Number(memory.firstDigit) - Number(memory.secondDigit),
        '*': () => Number(memory.firstDigit) * Number(memory.secondDigit),
        '/': () => Number(memory.firstDigit) / Number(memory.secondDigit)
    };

    Array.from(document.getElementsByTagName('button'))
        .forEach(e => e.addEventListener('click', onClick));

    function onClick(e) {
        const value = e.target.value;
        
        if (value === 'Clear') {
            input.innerText = '';
            result.innerText = '';
    
            memory.firstDigit = '';
            memory.operator = '';
            memory.secondDigit = '';
        } else if (operators.hasOwnProperty(value) && memory.operator === '') {
            memory.operator = value;
            input.innerHTML += ` ${value} `;
        } else if (memory.operator === '') {
            memory.firstDigit += value;
            input.innerHTML += value;
        } else if (value == '=') {

            if(memory.secondDigit === ''){
                result.innerHTML = 'NaN'
            } else{
                result.innerHTML = operators[memory.operator]();
            }            
        } else {
            memory.secondDigit += value;
            input.innerHTML += value;
        }
    }
}