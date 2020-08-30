function solve() {
    const selectMenuTo = document.getElementById('selectMenuTo');
    const result = document.querySelector('#result');

    const binaryOption = document.createElement('option');
    binaryOption.value = 'binary';
    binaryOption.innerHTML = 'Binary';

    const hexadecimalOption = document.createElement('option');
    hexadecimalOption.value = 'hexadecimal';
    hexadecimalOption.innerHTML = 'Hexadecimal';

    selectMenuTo.appendChild(binaryOption);
    selectMenuTo.appendChild(hexadecimalOption);

    const input = document.querySelector('#input');

    document.querySelector('button').addEventListener('click', () => {

        const convertBinary = Number(input.value).toString(2);
        const convertHexadecimal = Number(input.value).toString(16).toUpperCase();

        result.value = (selectMenuTo.value === 'binary')
            ? convertBinary
            : convertHexadecimal;
    })

}