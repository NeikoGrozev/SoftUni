function solve() {

    let onScreenButton = document.querySelector('#container button');
    let clearButton = document.querySelector(('#archive button'));
    let moviesUlElement = document.querySelector('#movies ul');
    let archiveUlElement = document.querySelector('#archive ul');

    onScreenButton.addEventListener('click', (e) => {
        e.preventDefault();

        let [nameMovie, hall, price] = Array.from(document.querySelectorAll('#container input'));
        let isNumber = isNaN(Number(price.value));

        if (!nameMovie.value.trim() || !hall.value.trim() || !price.value.trim() || isNumber) {
            return;
        }

        let liElement = createElement('li');
        let spanElement = createElement('span', nameMovie.value);
        let strongElement = createElement('strong', `Hall: ${hall.value}`);
        liElement.appendChild(spanElement);
        liElement.appendChild(strongElement);

        let divElement = createElement('div');

        let priceNum = Number(price.value).toFixed(2);

        let strongElement2 = createElement('strong', `${priceNum}`);
        let inputElement = createElement('input');
        inputElement.setAttribute('placeholder', 'Ticket Sold');
        let buttonElement = createElement('button', 'Archive')
        buttonElement.addEventListener('click', getArchive);

        divElement.appendChild(strongElement2);
        divElement.appendChild(inputElement);
        divElement.appendChild(buttonElement);
        liElement.appendChild(divElement);

        moviesUlElement.appendChild(liElement);

        nameMovie.value = '';
        hall.value = '';
        price.value = '';
    });

    clearButton.addEventListener('click', (e) => {
        archiveUlElement.innerHTML = '';
    });

    function getArchive(e) {

        let inputField = e.target.previousSibling.value;
        let currentPrice = e.target.previousSibling.previousSibling.textContent;
        let isNumber = isNaN(Number(inputField));

        if (isNumber || !inputField.trim()) {
            return;
        }

        let totalPrice = Number(currentPrice) * Number(inputField);
        let currentLiElement = e.target.parentElement.parentElement;
        e.target.parentElement.remove();

        let currentStrongElement = currentLiElement.querySelector('strong');
        currentStrongElement.textContent = `Total amount: ${totalPrice.toFixed(2)}`;
        let buttonElement2 = createElement('button', 'Delete');
        buttonElement2.addEventListener('click', deleteMovie);
        currentLiElement.appendChild(buttonElement2);
        archiveUlElement.appendChild(currentLiElement);
    }

    function deleteMovie(e) {
        e.target.parentElement.remove();
    }

    function createElement(type, content) {
        let element = document.createElement(type);
        if (content) {
            element.textContent = content;
        }

        return element;
    }
}