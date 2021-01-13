function validator(request) {
    const method = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const uriRegex = /^[A-Za-z0-9.]+$|\*/g;
    const version = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    const messageRegex = /^([^<>\\&'"]+)$/g;

    if (!request.hasOwnProperty('method') || !method.includes(request.method)) {
        throw new Error('Invalid request header: Invalid Method');
    }

    if (!request.hasOwnProperty('uri') || !request.uri.match(uriRegex)) {
        throw new Error('Invalid request header: Invalid URI');
    }

    if (!request.hasOwnProperty('version') || !version.includes(request.version)) {
        throw new Error('Invalid request header: Invalid Version');
    }

    if (!request.hasOwnProperty('message') || !request.message.match(messageRegex)) {
        throw new Error('Invalid request header: Invalid Message');
    }

    return request;
}

let input = {
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: 'Test'
}

console.log(validator(input));