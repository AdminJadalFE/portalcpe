export const URL_BACK = 'https://api.jadal.pe/api/'; // Cambiar en modo desarrollo cuando se requiera
export const URL_BUCKET = 'https://jadalfecpeqa.s3.amazonaws.com/';

export const FetchGet = async (endpoint) => {
    const response = await fetch(URL_BACK + endpoint);
    const content = await response.json();
    return content;
}

export const FetchConf = async (endpoint, method, data) => {

    const config = {
        method: method,
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    }
    const response = await fetch(URL_BACK + endpoint, config);
    const content = await response.json();
    return content;
}

