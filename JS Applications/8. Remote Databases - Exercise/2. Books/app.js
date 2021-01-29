const htmlSelectors = {
    'loadBooksBtn': () => document.querySelector('#loadBooks'),
    'loadBooksTBody': () => document.querySelector('#loadBooksTable tbody'),
    'createBookBtn': () => document.querySelector('#create-form > button'),
    'createTitle': () => document.querySelector('#create-title'),
    'createAuthor': () => document.querySelector('#create-author'),
    'createIsbn': () => document.querySelector('#create-isbn'),
    'createForm': () => document.querySelector('#create-form'),
    'editForm': () => document.querySelector('#edit-form'),
    'editBookBtn': () => document.querySelector('#edit-submitBtn'),
    'notEditBtn': () => document.querySelector('#edit-notSubmitBtn'),
    'editTitle': () => document.querySelector('#edit-title'),
    'editAuthor': () => document.querySelector('#edit-author'),
    'editIsbn': () => document.querySelector('#edit-isbn'),
};

const baseUrl = 'https://test-project-f5857-default-rtdb.europe-west1.firebasedatabase.app/Books/';

htmlSelectors['loadBooksBtn']().addEventListener('click', renderBooks);
htmlSelectors['createBookBtn']().addEventListener('click', createBook);

let title = '';
let author = '';
let isbn = '';
let id = '';

function renderBooks() {

    fetch(`${baseUrl}.json`)
        .then(res => res.json())
        .then(data => {

            htmlSelectors['loadBooksTBody']().innerHTML = '';

            Object.keys(data).forEach(id => {
                let { title, author, isbn } = data[id];
                let tr = createElement('tr', '', { 'data-id': id });

                let titleTd = createElement('td', title);
                let authorTd = createElement('td', author);
                let isbnTd = createElement('td', isbn);
                let buttonTd = createElement('td');
                let editBtn = createElement('button', 'Edit')
                let deleteBtn = createElement('button', 'Delete')

                buttonTd.appendChild(editBtn);
                buttonTd.appendChild(deleteBtn);

                editBtn.addEventListener('click', editBook);
                deleteBtn.addEventListener('click', deleteBook);

                tr.appendChild(titleTd);
                tr.appendChild(authorTd);
                tr.appendChild(isbnTd);
                tr.appendChild(buttonTd);

                htmlSelectors['loadBooksTBody']().appendChild(tr);

            });
        });
}

function createBook() {
    title = htmlSelectors['createTitle']().value;
    author = htmlSelectors['createAuthor']().value;
    isbn = htmlSelectors['createIsbn']().value;

    if (title && author && isbn) {
        let currentBody = {
            'title': title.value,
            'author': author.value,
            'isbn': isbn.value
        }

        fetch(`${baseUrl}.json`, { method: 'POST', body: JSON.stringify(currentBody) })
            .then(renderBooks);
    }
}

function editBook(e) {
    let tr = e.currentTarget.parentElement.parentElement
    id = tr.getAttribute('data-id');

    htmlSelectors['editTitle']().value = tr.children[0].textContent;
    htmlSelectors['editAuthor']().value = tr.children[1].textContent;
    htmlSelectors['editIsbn']().value = tr.children[2].textContent;

    htmlSelectors['createForm']().style.display = 'none';
    htmlSelectors['editForm']().style.display = 'block';

    let empty = false;

    htmlSelectors['editBookBtn']().addEventListener('click', (e) => {
        e.preventDefault();

        title = htmlSelectors['editTitle']().value,
            author = htmlSelectors['editAuthor']().value,
            isbn = htmlSelectors['editIsbn']().value

        if (title && author && isbn) {
            let currentBody = {
                'title': title,
                'author': author,
                'isbn': isbn
            };

            fetch(`${baseUrl}${id}.json`, { method: 'PUT', body: JSON.stringify(currentBody) })
                .then(renderBooks);

            htmlSelectors['editForm']().style.display = 'none';
            htmlSelectors['createForm']().style.display = 'block';

            empty = true;
        }
    });

    htmlSelectors['notEditBtn']().addEventListener('click', (e) => {
        e.preventDefault();
        htmlSelectors['createForm']().style.display = 'block';
        htmlSelectors['editForm']().style.display = 'none';
        empty = true;
    });

    if (empty) {
        htmlSelectors['editTitle']().value = '';
        htmlSelectors['editAuthor']().value = '';
        htmlSelectors['editIsbn']().value = '';
    }
}

function deleteBook(e) {
    id = e.currentTarget.parentElement.parentElement.getAttribute('data-id');

    fetch(`${baseUrl}${id}.json`, { method: 'DELETE' })
        .then(renderBooks);
}

function createElement(type, value, attributes) {
    let element = document.createElement(type);

    if (value) {
        element.textContent = value;
    }

    if (attributes) {
        Object.entries(attributes).forEach(([attrKey, attrValue]) => {
            element.setAttribute(attrKey, attrValue);
        })
    }

    return element;
}