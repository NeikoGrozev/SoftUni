let handlers = {};

function registerHandler(method, url, handler) {
    const currentHandler = handlers[url];

    if (!currentHandler) {
        handlers[url] = {};
    }

    handlers[url][method] = handler;
}

function match(method, url) {

    let methods = handlers[url] || {};

    let currentHandler = methods[method];

    if (!currentHandler) {
        return defaultHandler;
    }

    return currentHandler;
}

function defaultHandler(req, res) {
    res.statusCode = 404;
    res.write('Not Found');
    res.end();
}

module.exports = {
    registerHandler,
    match,
    get: (...params) => registerHandler('GET', ...params),
    post: (...params) => registerHandler('POST', ...params),
    delete: (...params) => registerHandler('DELETE', ...params)
}