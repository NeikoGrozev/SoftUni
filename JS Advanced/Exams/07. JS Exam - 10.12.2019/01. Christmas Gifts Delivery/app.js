function solution() {
    let [addSection, listSection, sendSection, discardSection] = document.querySelectorAll('.container section');
    let ulListSection = listSection.querySelector('ul');
    let ulSendSEction = sendSection.querySelector('ul');
    let ulDiscardSection = discardSection.querySelector('ul');

    let addButton = addSection.querySelector('button');
    addButton.addEventListener('click', addGift)

    function addGift(e) {
        e.preventDefault();

        let gift = addSection.querySelector('input');

        let li = document.createElement('li');
        li.textContent = gift.value;
        li.setAttribute('class', 'gift')

        let sendButton = document.createElement('button');
        sendButton.textContent = 'Send';
        sendButton.setAttribute('id', 'sendButton');
        sendButton.addEventListener('click', sendGift);

        let discardButton = document.createElement('button');
        discardButton.textContent = 'Discard';
        discardButton.setAttribute('id', 'discardButton');
        discardButton.addEventListener('click', discardGift);

        li.appendChild(sendButton);
        li.appendChild(discardButton);

        ulListSection.appendChild(li);

        let allLiElement = Array.from(ulListSection.querySelectorAll('li'));
        ulListSection.innerHTML = '';

        allLiElement.sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach(x => ulListSection.appendChild(x));

        gift.value = '';
    }

    function sendGift(e) {
        let currentLiElement = e.target.parentElement;
        e.target.nextSibling.remove();
        e.target.remove();

        ulSendSEction.appendChild(currentLiElement);
    }

    function discardGift(e) {
        let currentLiElement = e.target.parentElement;
        e.target.previousSibling.remove();
        e.target.remove();

        ulDiscardSection.appendChild(currentLiElement);
    }
}