/**
 * 请求时的action常量
 */
export const XHTTP_BEGIN = 'XHTTP_BEGIN';
export const XHTTP_RECEIVE = 'XHTTP_RECEIVE';
export const XHTTP_ERROR = 'XHTTP_ERROR';


// 各action对应Http method
export const XHTTP_METHODS = {
    list: 'GET',
    detail: 'GET',
    create: 'POST',
    update: 'PATCH',
    delete: 'DELETE',
    download: 'GET',
    upload: 'POST'
};

// api config
export const XHTTP_API = require('../../../config/api.json');