let {getLayout} = require('../views/layout');
//const homeView = require('../views/home');
const fs = require('fs/promises');
const title = 'Home';

async function getHomeTemplate(){
    const res = (await fs.readFile('./views/home.html')).toString();

    return res;    
}

module.exports = async(req, res) => {
    res.write(getLayout(await getHomeTemplate(), title));
    res.end();
}