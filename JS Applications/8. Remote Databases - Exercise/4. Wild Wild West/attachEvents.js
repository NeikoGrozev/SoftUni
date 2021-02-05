const baseUrl = 'https://test-project-f5857-default-rtdb.europe-west1.firebasedatabase.app/WildWildWest/';

const elements = {
    addPlayerName: () => document.querySelector('#addName'),
    addPlayerBtn: () => document.querySelector('#addPlayer'),
    playersDiv: () => document.querySelector('#players'),
    canvas: () => document.querySelector('#canvas'),
    saveBtn: () => document.querySelector('#save'),
    reloadBtn: () => document.querySelector('#reload')
}

function attachEvents() {
    elements.addPlayerBtn().addEventListener('click', addPlayer);

    fetch(`${baseUrl}.json`)
        .then(res => res.json())
        .then(data => {

            elements.playersDiv().innerHTML = '';
            Object.keys(data).forEach(key => {

                let { name, money, bullets } = data[key];

                let playerDiv = createElement('div', '', { 'class': 'player', 'data-id': key })
                let div = createElement('div');
                let label = createElement('label', 'Name: ');
                let secondLabel = createElement('label', name, { id: 'playerName' });

                div.appendChild(label);
                div.appendChild(secondLabel)
                playerDiv.appendChild(div);

                div = createElement('div');
                label = createElement('label', 'Money: ');
                secondLabel = createElement('label', money, { id: 'playerMoney' });

                div.appendChild(label);
                div.appendChild(secondLabel)
                playerDiv.appendChild(div);

                div = createElement('div');
                label = createElement('label', 'Bullets: ');
                secondLabel = createElement('label', bullets, { id: 'playerBullets' });

                div.appendChild(label);
                div.appendChild(secondLabel)
                playerDiv.appendChild(div);

                let playBtn = createElement('button', 'Play', { id: 'playBtn' })
                let deleteBtn = createElement('button', 'Delete', { id: 'deleteBtn' })

                playBtn.addEventListener('click', playGame);
                deleteBtn.addEventListener('click', deletePlayer);

                playerDiv.appendChild(playBtn);
                playerDiv.appendChild(deleteBtn);


                elements.playersDiv().appendChild(playerDiv);
            });
        });
}

function saveGame(currPlayer) {
    let currentIdPlayer = currPlayer.id;

    let currentBodyPlayer = {
        'name': currPlayer.name,
        'money': currPlayer.money,
        'bullets': currPlayer.bullets
    };

    fetch(`${baseUrl}${currentIdPlayer}.json`, {
        method: 'PUT', body: JSON.stringify(currentBodyPlayer)
    })
        .then(() => {
            // elements.canvas().style.display = 'none';
            location.reload();
        });
}

function deletePlayer(e) {
    let currentPlayerDiv = e.target.parentNode;
    let currentId = currentPlayerDiv.getAttribute('data-id');

    fetch(`${baseUrl}${currentId}.json`, { method: 'DELETE' })
        .then(() => {
            currentPlayerDiv.remove();
        })
}

function playGame(e) {

    let currentPlayerDiv = e.target.parentNode;
    let currentId = currentPlayerDiv.getAttribute('data-id');
    let currentName = currentPlayerDiv.querySelector('#playerName').textContent;
    let currentMoney = currentPlayerDiv.querySelector('#playerMoney').textContent;
    let currentBullets = currentPlayerDiv.querySelector('#playerBullets').textContent;

    let player = {
        id: currentId,
        name: currentName,
        money: Number(currentMoney),
        bullets: Number(currentBullets)
    };

    elements.canvas().style.display = 'block';
    elements.saveBtn().style.display = 'inline-block';
    elements.reloadBtn().style.display = 'inline-block';

    loadCanvas(player);
}

function addPlayer(e) {
    let playerName = elements.addPlayerName()
    let currentBody = {
        name: playerName.value,
        money: 500,
        bullets: 6
    }

    fetch(`${baseUrl}.json`, { method: 'POST', body: JSON.stringify(currentBody) })
        .then(() => {
            attachEvents();
            playerName.value = '';
        });
}

function createElement(type, value, attributes) {
    let element = document.createElement(type);

    if (value) {
        element.textContent = value;
    }

    if (attributes) {

        Object.keys(attributes).forEach(x => {
            element.setAttribute(x, attributes[x])
        });
    }

    return element;
}