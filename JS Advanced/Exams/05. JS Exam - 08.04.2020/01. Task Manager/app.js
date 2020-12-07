function solve() {
    let [addTaskSection, openSection, inProgresSection, completeSection] = document.querySelectorAll('.wrapper section');

    let task = addTaskSection.querySelector('#task');
    let description = addTaskSection.querySelector('#description');
    let date = addTaskSection.querySelector('#date');
    let addButton = addTaskSection.querySelector('#add');


    addButton.addEventListener('click', addTask);

    function addTask(e) {
        e.preventDefault();

        if (!task.value.trim() || !description.value.trim() || !date.value.trim()) {
            return;
        }

        let article = createElement('article');
        let h3 = createElement('h3', task.value);
        let pDescription = createElement('p', `Description: ${description.value}`);
        let pDAte = createElement('p', `Due Date: ${date.value}`);

        article.appendChild(h3);
        article.appendChild(pDescription);
        article.appendChild(pDAte);

        let div = createElement('div')
        div.setAttribute('class', 'flex');

        let startButton = createElement('button', 'Start');
        startButton.setAttribute('class', 'green');
        startButton.addEventListener('click', startTask);

        let deleteButton = createElement('button', 'Delete');
        deleteButton.setAttribute('class', 'red');
        deleteButton.addEventListener('click', deleteTask);

        div.appendChild(startButton);
        div.appendChild(deleteButton);
        article.appendChild(div)

        let divOpenSection = openSection.querySelectorAll('div')[1];
        divOpenSection.appendChild(article);

        task.value = '';
        description.value = '';
        date.value = '';
    }

    function startTask(e) {
        let currentArticle = e.target.parentElement.parentElement;
        let currentDiv = e.target.parentElement;
        e.target.remove();

        let finishButton = createElement('button', 'Finish');
        finishButton.setAttribute('class', 'orange');
        finishButton.addEventListener('click', finishTask);

        currentDiv.appendChild(finishButton);

        let divInProgressSection = inProgresSection.querySelectorAll('div')[1];
        divInProgressSection.appendChild(currentArticle);
    }

    function deleteTask(e) {
        e.target.parentElement.parentElement.remove();
    }

    function finishTask(e){
        let currentArticle = e.target.parentElement.parentElement;
        e.target.parentElement.remove();

        let divCompleteSection = completeSection.querySelectorAll('div')[1];
        divCompleteSection.appendChild(currentArticle);
    }

    function createElement(type, text) {
        let element = document.createElement(type);

        if (text) {
            element.textContent = text;
        }

        return element;
    }
}