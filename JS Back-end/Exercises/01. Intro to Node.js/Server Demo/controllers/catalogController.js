let { getLayout } = require('../views/layout');
//const { getCatalogView } = require('../views/catalog');
const fs = require('fs/promises');
const title = 'Catalog';

let { peoples } = require('../database');

async function getCatalogTemplate(){
    const result = (await fs.readFile('./views/catalog.html')).toString();
    return result;
}

module.exports = async (req, res) => {

    var catalogDatabase = Object.entries(peoples).map(([id, i]) => `<li data-id="${id}">${i}  ---  <a href="/delete?id=${id}">Delete</a></li>`).join('')
    var catalogView = await getCatalogTemplate();
    catalogView = catalogView.replace('{{peoples}}', catalogDatabase);

    res.write(getLayout(catalogView, title));
    res.end();
}