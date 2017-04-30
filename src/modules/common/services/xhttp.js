/**
 * xhttp service.
 */
const config = require('../../../config/api.json');

class Xhttp {
    get(url) {
        return BuildMethod({ url, method: 'GET' });
    }
    post(url, data) {
        return BuildMethod({ url, method: 'POST' });
    }
}


export const xhttp = new Xhttp;

function BuildMethod({ url, data, method }) {
    let _url = "http://baihaobio.com/Admin" + url;
    let fetchOption = {
        method,
        headers: {},
        credentials: 'include'
    };

    if (data) {
        fetchOption.headers['Accept'] = 'application/json';
        fetchOption.headers['Content-Type'] = 'application/json';
        fetchOption.body = JSON.stringify(data);
    }

    let fetchRef = fetch(_url, fetchOption).then(res => {
        if (res.status >= 400 && res.status < 500) return res.json().then(json => Promise.reject(json.code));
        if (res.status >= 500 && res.status < 600) return Promise.reject(res.status);
        return res;
    });

    return fetchRef.then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.errno) return Promise.reject(res.errno);
            return res.result;
        }).catch(code => handleError(code));
}


// error handler.
function handleError(code) {
    console.log(code);
    switch (code) {
        case 10200:
            window.location = '/login';
    }
}