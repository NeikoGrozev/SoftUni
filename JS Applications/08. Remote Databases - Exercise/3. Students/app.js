let tBody = document.querySelector('tbody');
let firstName = document.querySelector('#create-firstName');
let lastName = document.querySelector('#create-lastName');
let facultyNumber = document.querySelector('#create-facultyNumber');
let grade = document.querySelector('#create-grade');
let submitBtn = document.querySelector('#create-student button');

submitBtn.addEventListener('click', createStudent);
let nextId;

const baseUrl = 'https://test-project-f5857-default-rtdb.europe-west1.firebasedatabase.app/Students/';

(function renderStudents() {

    fetch(`${baseUrl}.json`)
        .then(res => res.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                let { id, firstName, lastName, facultyNumber, grade } = data[key];

                let tr = createElement('tr');
                let idTd = createElement('td', id);
                let firstNameTd = createElement('td', firstName);
                let lastNameTd = createElement('td', lastName);
                let facultyNumberTd = createElement('td', facultyNumber);
                let gradeTd = createElement('td', grade);

                tr.appendChild(idTd);
                tr.appendChild(firstNameTd);
                tr.appendChild(lastNameTd);
                tr.appendChild(facultyNumberTd);
                tr.appendChild(gradeTd);

                tBody.appendChild(tr);
            });
        });

    requestSize();

})();

function createStudent(e) {

    if (firstName.value && lastName.value && facultyNumber.value && grade.value) {

        let currentBody = {
            'id': nextId,
            'firstName': firstName.value,
            'lastName': lastName.value,
            'facultyNumber': facultyNumber.value,
            'grade': grade.value
        }

        fetch(`${baseUrl}.json`, { method: 'POST', body: JSON.stringify(currentBody) })
            .then(renderStudents);
    }
}

function requestSize() {

    fetch(`${baseUrl}.json`)
        .then(res => res.json())
        .then(data => {
            nextId = Object.keys(data).length;
            nextId++;
        });
}

function createElement(type, value) {
    let element = document.createElement(type);

    if (value) {
        element.textContent = value;
    }

    return element;
}
