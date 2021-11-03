let {getLayout} = require('../views/layout');
//const aboutView = require('../views/about');
const fs = require('fs/promises');
const title = 'About';

async function getAboutTemplate(){
    const result = (await fs.readFile('./views/about.html')).toString();
    return result;
}

module.exports = async (req, res) => {
    res.write(getLayout(await getAboutTemplate(), title));
    res.end();
}