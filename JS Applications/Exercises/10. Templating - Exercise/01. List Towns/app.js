const element = {
    input: () => document.querySelector('#towns'),
    button: () => document.querySelector('#btnLoadTowns'),
    root: () => document.querySelector('#root')
}

element.button().addEventListener('click', getInputInformation);

function getInputInformation(e) {
    e.preventDefault();

    let { value } = element.input();
    let towns = value.split(/[, ]+/g);
    
    appendTowns(towns);
}

function appendTowns(towns) {

    fetch('./temlate.hbs')
        .then(res => res.text())
        .then(temlateSource => {
            let template = Handlebars.compile(temlateSource);
            let htmlResult = template({ towns })
            element.root().innerHTML = htmlResult;
        })
}