const buildOptions = (data) => {
    let options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.header = {
            'content-type': 'application/json'
        }
    }

    return options;
}

const request = async (method, url, data) => {
    const response = await fetch(url, {
        method,
        ...buildOptions(data)
    });

    // if (!response.ok) {
    //     throw new Error('')
    // }

    const result = response.json();

    return result;
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');