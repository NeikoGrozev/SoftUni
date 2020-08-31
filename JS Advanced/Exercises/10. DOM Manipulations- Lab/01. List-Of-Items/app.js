function addItem() {
    const ul = document.querySelector('#items');
    const input = document.querySelector('#newItemText').value;

    if (input !== '') {
        const li = document.createElement('li');
        li.textContent = input;
        ul.appendChild(li);
        document.querySelector('#newItemText').value = '';
    }
}