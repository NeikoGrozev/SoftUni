function attachEvents() {
    let btnSubmit = document.querySelector('#submit');
    let btnRefresh = document.querySelector('#refresh');
    let messages = document.querySelector('#messages');
    let authorInput = document.querySelector('#author');
    let contentInput = document.querySelector('#content');

    let url = 'https://rest-messanger.firebaseio.com/messanger.json';

    btnSubmit.addEventListener('click', create);
    btnRefresh.addEventListener('click', refresh);

    function create() {
        let body = {
            author: authorInput.value,
            content: contentInput.value
        };
        fetch(url, { method: 'POST', body: JSON.stringify(body) });
        authorInput.value = '';
        contentInput.value = '';
        refresh();
    }

    function refresh() {
        fetch(url)
            .then(res => res.json())
            .then(date => {
                let currentContent = Object.values(date)
                    .reduce((acc, message) => acc += `${message.author}: ${message.content}\n`, '');
                messages.textContent = currentContent;
            })
    }
}

attachEvents();