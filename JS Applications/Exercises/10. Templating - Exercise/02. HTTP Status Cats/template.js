(renderCatTemplate)();

let elements = {
    allCats: () => document.querySelector('#allCats'),
}

function renderCatTemplate() {
    
    Promise.all([
        getTemplate('./catsTemplate.hbs'),
        getTemplate('./catTemplate.hbs'),
        getTemplate('./infoTemplate.hbs'),
        getTemplate('./statusTemplate.hbs')
    ])
    .then(([catsTemplateSrc, catTemplateSrc, infoTemplateSrc, statusTemplateSrc]) => {
        Handlebars.registerPartial('cat', catTemplateSrc);
        Handlebars.registerPartial('info', infoTemplateSrc);
        Handlebars.registerPartial('status', statusTemplateSrc);
        let template = Handlebars.compile(catsTemplateSrc);
        let htmlResult = template({cats});
        
        elements.allCats().innerHTML = htmlResult;

        let buttons = elements.allCats().querySelectorAll('.showBtn');
        buttons.forEach(x => x.addEventListener('click', showStatus));
    })
}

function showStatus(e){
let statusDiv = e.target.nextElementSibling
    if(statusDiv.style.display == 'none'){
        statusDiv.style.display = 'block';
        e.target.textContent = 'Hide status code';
    }else{
        statusDiv.style.display = 'none';
        e.target.textContent = 'Show status code';
    }
}

function getTemplate(templateLocation) {
    return fetch(templateLocation)
        .then(res => res.text());
}
