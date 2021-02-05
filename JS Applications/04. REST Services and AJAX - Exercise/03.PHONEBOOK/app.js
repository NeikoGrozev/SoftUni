function attachEvents() {
    let btnLoad = document.querySelector('#btnLoad');
    let btnCreate = document.querySelector('#btnCreate');
    let phonebook = document.querySelector('#phonebook');
    let personInput = document.querySelector('#person');
    let phoneInput = document.querySelector('#phone');

    let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

    btnLoad.addEventListener('click', loadPhonebook);
    btnCreate.addEventListener('click', createPhone);

    function loadPhonebook() {
        fetch(url)
            .then(res => res.json())
            .then(date => {
                phonebook.innerHTML = '';
                
                Object.keys(date).map(key => {
                    let li = document.createElement('li');
                    li.textContent = `${date[key].person}: ${date[key].phone}`;
                    let btnDelete = document.createElement('button');
                    btnDelete.textContent = 'Delete';
                    btnDelete.addEventListener('click', () => {
                        let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
                        fetch(deleteUrl, { method: 'DELETE' });
                    });
                    li.appendChild(btnDelete);
                    phonebook.appendChild(li);
                });
            });
    }

    function createPhone() {
        let phone = {
            person: personInput.value,
            phone: phoneInput.value
        }

        fetch(url, { method: 'POST', body: JSON.stringify(phone) });
        loadPhonebook();

    }
}

attachEvents();