$(() => {

    let monkeysDiv = document.querySelector('.monkeys');

    fetch('./monkeyTemplate.hbs')
        .then(res => res.text())
        .then(monkeyTemplate => {

            let template = Handlebars.compile(monkeyTemplate);
            let htmlResult = template({ monkeys })

            monkeysDiv.innerHTML = htmlResult;

            let buttons = monkeysDiv.querySelectorAll('button');
            buttons.forEach(x => x.addEventListener('click', showInformation));
        });
})

function showInformation(e) {

    let pElement = e.target.nextElementSibling;

    if (pElement.style.display == 'none') {
        pElement.style.display = 'block';
    } else {
        pElement.style.display = 'none';
    }
}