function attachEvents() {
    let btnLoad = document.querySelector('.load');
    let btnAdd = document.querySelector('.add');
    let catches = document.querySelector('#catches');

    let url = 'https://fisher-game.firebaseio.com/catches.json';
    let baseURL = 'https://fisher-game.firebaseio.com/catches/';

    btnLoad.addEventListener('click', load)
    btnAdd.addEventListener('click', add);

    function load() {
        catches.innerHTML = '';

        fetch(url)
            .then(res => res.json()
                .then(data => {
                    Object.keys(data).map(key => {

                        let currentCatchDiv = createElement('div', ['class=catch', `data-id=${key}`]);

                        let anglerLabel = createElement('label', '', 'Angler');
                        let angler = createElement('input', ['type=text', 'class=angler', `value=${data[key].angler}`]);

                        let weightLabel = createElement('label', '', 'Weight');
                        let weight = createElement('input', ['type=number', 'class=weight', `value=${data[key].weight}`]);

                        let speciesLabel = createElement('label', '', 'Species');
                        let species = createElement('input', ['type=text', 'class=species', `value=${data[key].species}`]);

                        let locationLabel = createElement('label', '', 'Location');
                        let location = createElement('input', ['type=text', 'class=location', `value=${data[key].location}`]);

                        let baitLabel = createElement('label', '', 'Bait');
                        let bait = createElement('input', ['type=text', 'class=bait', `value=${data[key].bait}`]);

                        let captureTimeLabel = createElement('label', '', 'Capture Time');
                        let captureTime = createElement('input', ['type=number', 'class=captureTime', `value=${data[key].captureTime}`]);

                        let updateButton = createElement('button', ['class=update'], 'Update');
                        let deleteButton = createElement('button', ['class=delete'], 'Delete');

                        updateButton.addEventListener('click', update);
                        deleteButton.addEventListener('click', deleteForm)


                        currentCatchDiv.appendChild(anglerLabel);
                        currentCatchDiv.appendChild(angler);
                        currentCatchDiv.appendChild(createElement('hr'));

                        currentCatchDiv.appendChild(weightLabel);
                        currentCatchDiv.appendChild(weight);
                        currentCatchDiv.appendChild(createElement('hr'));

                        currentCatchDiv.appendChild(speciesLabel);
                        currentCatchDiv.appendChild(species);
                        currentCatchDiv.appendChild(createElement('hr'));

                        currentCatchDiv.appendChild(locationLabel);
                        currentCatchDiv.appendChild(location);
                        currentCatchDiv.appendChild(createElement('hr'));

                        currentCatchDiv.appendChild(baitLabel);
                        currentCatchDiv.appendChild(bait);
                        currentCatchDiv.appendChild(createElement('hr'));

                        currentCatchDiv.appendChild(captureTimeLabel);
                        currentCatchDiv.appendChild(captureTime);
                        currentCatchDiv.appendChild(createElement('hr'));

                        currentCatchDiv.appendChild(updateButton);
                        currentCatchDiv.appendChild(deleteButton);

                        catches.appendChild(currentCatchDiv);
                    })
                }))
    }

    function add() {
        let angler = document.querySelector('#addForm .angler');
        let weight = document.querySelector('#addForm .weight');
        let species = document.querySelector('#addForm .species');
        let location = document.querySelector('#addForm .location');
        let bait = document.querySelector('#addForm .bait');
        let captureTime = document.querySelector('#addForm .captureTime');

        if(!angler.value || !weight.value || !species.value || !location.value || !bait.value || !captureTime.value){
            return;
        }

        let body = {
            angler: angler.value,
            weight: Number(weight.value),
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: Number(captureTime.value)
        }

        fetch(url, { method: 'POST', body: JSON.stringify(body) });

        angler.value = '';
        weight.value = '';
        species.value = '';
        location.value = '';
        bait.value = '';
        captureTime.value = '';
    }

    function update(e) {
        let currentChildElement = e.target.parentElement;
        let id = currentChildElement.attributes['data-id'];

        let currentUrl = `${baseURL}${id.value}.json`;

        let anglerInput = currentChildElement.querySelector('input.angler');
        let weightInput = currentChildElement.querySelector('input.weight');
        let speciesInput = currentChildElement.querySelector('input.species');
        let locationInput = currentChildElement.querySelector('input.location');
        let baitInput = currentChildElement.querySelector('input.bait');
        let captureTimeInput = currentChildElement.querySelector('input.captureTime');

        let newBody = {
            angler: anglerInput.value,
            weight: Number(weightInput.value),
            species: speciesInput.value,
            location: locationInput.value,
            bait: baitInput.value,
            captureTime: Number(captureTimeInput.value)
        }

        fetch(currentUrl, { method: 'PUT', body: JSON.stringify(newBody) })
    }

    function deleteForm(e) {
        let currentChildElement = e.target.parentElement;
        let id = currentChildElement.attributes['data-id'];

        let currentUrl = `${baseURL}${id.value}.json`;

        fetch(currentUrl, { method: 'DELETE' })
        .then(load)
    }

    function createElement(type, attributes, content) {
        let element = document.createElement(type);

        if (attributes) {
            attributes.map(a => {
                let [name, value] = a.split('=');
                element.setAttribute(name, value);
            });
        }

        if (content) {
            element.textContent = content;
        }

        return element;
    }

}

attachEvents();

