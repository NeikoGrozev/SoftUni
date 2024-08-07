const buildOptions = (data) => {
    let options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.header = {
            'Content-Type': 'application/json'
        }
    }

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        options.headers = {
            ...options.headers,
            'X-Authorization': accessToken
        }
    }

    return options;
}

const request = async (method, url, data) => {
    const response = await fetch(url, {
        ...buildOptions(data),
        method
    });

    // if (!response.ok) {
    //     throw new Error('')
    // }

    if (!response.ok) {
        return {};
    }

    if (response.status === 204) {
        return {};
    }

    const result = response.json();

    return result;
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');