function solve() {
    const li = document.getElementsByTagName('li');
    let a = 65;

    [...li].forEach(e => {
        e.setAttribute('id', String.fromCharCode(a++))
    });

    document.querySelector('button').addEventListener('click', onClick);

    function onClick() {
        const currentName = document.getElementsByTagName('input')[0].value;
        const firstLetter = currentName[0].toUpperCase();
        const word = firstLetter + currentName.slice(1).toLowerCase();

        const currnetLi = document.getElementById(`${firstLetter}`);

        if (currnetLi.textContent === '') {
            currnetLi.textContent = word;
        } else {
            const temp = currnetLi.textContent + `, ${word}`;
            currnetLi.textContent = temp;
        }

        document.getElementsByTagName('input')[0].value = '';
    }
}