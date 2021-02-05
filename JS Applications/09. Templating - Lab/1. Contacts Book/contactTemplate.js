(() => {
    fetch('./handlebars.hbs')
        .then(res => res.text())
        .then((templateHTML) => loadContact(templateHTML));
})();

function loadContact(templateHTML) {
    let template = Handlebars.compile(templateHTML);
    let contactHtml = template({ contacts })
    let contactsDiv = document.querySelector('#contacts')
    contactsDiv.innerHTML = contactHtml;

    let buttons = contactsDiv.querySelectorAll('.detailsBtn');
    buttons.forEach(x => x.addEventListener('click', showDetails));
}

function showDetails(e) {

    let detailsDiv = e.target.parentElement.querySelector('.details')

    if (detailsDiv.style.display == "block") {
        detailsDiv.style.display = "none"
    } else {
        detailsDiv.style.display = "block"
    }
}