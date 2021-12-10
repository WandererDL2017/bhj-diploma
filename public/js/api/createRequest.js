/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = options.responseType;
    let formData = new FormData();
    let url = options.url;
    
    if (options.method === 'GET') {
        url = options.url + '?';
        for (let key in options.data) {
            url += key + '=' + options.data[key] + '&'
        }
        url = url.substr(0, url.length - 1);
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (err) {
        console.log('Что-то пошло не так', err);
    }

    xhr.onload = () => {
        options.callback(xhr.error, xhr.response);
    };
}
