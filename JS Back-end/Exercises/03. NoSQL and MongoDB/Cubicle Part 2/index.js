const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routerConfig = require('./config/routes');

const { init: storage } = require('./services/storage.js');



start();

async function start() {

    const app = express();
    const port = 3000;
    
    expressConfig(app);
    databaseConfig(app);
    app.use(await storage());
    routerConfig(app);   
    
    app.listen(port, () => console.log(`Listening on port ${port}!`));
}