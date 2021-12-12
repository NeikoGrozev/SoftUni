const express = require('express');

const indexConfig = require('./config/index');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routersConfig = require('./config/routers');

start();

async function start() {

    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routersConfig(app);

    app.listen(indexConfig.PORT, () => console.log(`Application started at http://localhost:${indexConfig.PORT}`));
}