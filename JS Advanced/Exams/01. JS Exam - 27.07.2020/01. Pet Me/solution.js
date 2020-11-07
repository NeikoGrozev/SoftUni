function solve() {

    let addBtn = document.querySelector('#container button');
    addBtn.addEventListener('click', addPet);

    function addPet(e) {

        e.preventDefault();

        let inputContainer = document.querySelectorAll('#container input');
        let isEmptyField = false;

        Array.from(inputContainer).forEach(x => {
            if (x.value.length == 0) {
                isEmptyField = true;
            }
        });

        let number = isNaN(Number(inputContainer[1].value));

        if (isEmptyField || number) {
            return;
        }

        let name = inputContainer[0].value;
        let age = inputContainer[1].value;
        let kind = inputContainer[2].value;
        let ownerName = inputContainer[3].value;

        let liElement = document.createElement('li');
        let pElement = document.createElement('p');
        let spanElement = document.createElement('span');
        let petButtonElement = document.createElement('button');

        pElement.innerHTML = `<strong>${name}</strong> is a <strong>${age}</strong> year old <strong>${kind}</strong>`;
        spanElement.textContent = `Owner: ${ownerName}`;
        petButtonElement.textContent = 'Contact with owner';


        liElement.appendChild(pElement);
        liElement.appendChild(spanElement);
        liElement.appendChild(petButtonElement);

        let adoptionUlElement = document.querySelector('#adoption ul');
        adoptionUlElement.appendChild(liElement);

        Array.from(inputContainer).forEach(x => x.value = '');

        petButtonElement.addEventListener('click', addContact);
    }

    function addContact(e) {
        let currentPerentElement = e.target.parentElement;
        e.target.remove();

        let divElement = document.createElement('div');
        let inputElement = document.createElement('input');
        let contactButtonElement = document.createElement('button');

        inputElement.setAttribute('placeholder', 'Enter your names');
        contactButtonElement.textContent = 'Yes! I take it!';
        contactButtonElement.addEventListener('click', addNewOwner);

        divElement.appendChild(inputElement);
        divElement.appendChild(contactButtonElement);
        currentPerentElement.appendChild(divElement);
    }

    function addNewOwner(e) {
        let inputValue = e.target.previousSibling.value;

        if (!inputValue) {
            return;
        }

        let currentPerentElement = e.target.parentElement.parentElement;
        e.target.parentElement.previousSibling.textContent = `New Owner: ${inputValue}`

        e.target.parentElement.remove();

        let checkedBtn = document.createElement('button');
        checkedBtn.textContent = 'Checked';
        currentPerentElement.appendChild(checkedBtn);

        let adoptedUlElement = document.querySelector('#adopted ul');
        adoptedUlElement.appendChild(currentPerentElement);

        checkedBtn.addEventListener('click', checkAll);
    }

    function checkAll(e) {
        e.target.parentElement.remove();
    }
}