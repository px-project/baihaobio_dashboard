/**
 * xhttp service.
 */
const config = require('../../../config/api.json');

// gen url.
function url (api = '', params = [], conditions = {}) {
    let url = config[api];

    // params handler.
    url = url.replace(new RegExp('\{[a-zA-Z0-9_]+\}', 'g'), substr => params.shift());
    if (params.length) url += `/${params.join('/')}`;

    // conditions handler.
    url += '?' + Object.keys(conditions).map(key => {
        let value = conditions[key];
        if (!value && value !== false) return;
        return (Array.isArray(value) ? value : [value]).map(v => v ? `${key}=${v}&` : '').join('');
    }).join('');

    return url.substr(0, url.length - 1);
}

// error handler.
function handleError (code) {
    switch (code) {
        case 'USER_NOT_LOGIN':
            window.location = '/login.html';
    }
}

// build xhttp method.
function buildMethod (method, options) {
    let {api, params, conditions = {}, data} = options;

    let url = url(api, params, conditions);
    let fetchOption = {method, headers: {}};
    
    if (data) {
        fetchOption.headers['Accept'] = 'application/json';
        fetchOption.headers['Content-Type'] = 'application/json';
        fetchOption.body = JSON.stringify(data);
    }

    let fetchRef = fetch(url, fetchOption).then(res => {
        if (res.status >= 400 && res.status < 500) return res.json().then(json => Promise.reject(json.code));
        if (res.status >= 500 && res.status < 600) return Promise.reject(res.status);
        return res;
    });

    return fetchRef
        .then(res => res.json())
        .catch(code => handleError(code));
}


class Xhttp {
    list (api, params = [], conditions = {}) {
        return buildMethod('GET', {api,params, conditions});
    }

    detail (api, params = [], conditions = {}) {
        return buildMethod('GET', {api, params, conditions});
    }

    create(api, params = [], data = {}) {
        return buildMethod('POST', {api, params, data});
    }

    update (api, params = [], data = {}) {
        return buildMethod('POST', {api, params, data});
    }

    delete (api, params = []) {
        return buildMethod('DETETE', {api, params});
    }

    url (api, params = [], conditions = {}) {
        return url(api, params, conditions);
    }
}

export const xhttp = new Xhttp;
