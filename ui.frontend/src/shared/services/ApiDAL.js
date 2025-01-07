import axios from 'axios';

/**
 * Function is Used to get the Data Request From API URL
 * @param {*} url - String API URL
 * @param {*} config - Object for differnt get call configurations
 */
export const getDataRequest = async (url, config = {}, withCreds = false, timeout = null) => {
    const header = {}
    if (withCreds) {
        header.withCredentials = true;
    }
    if (timeout !== null) {
        header.timeout = timeout
    }
    const response = await axios.get(url, config, header);
    return response;
};

/**
 * Function is Used to Post the Data Request From API URL
 * @param {*} url - String API URL
 * @param {*} data - Payload Data
 * @param boolean withCreds
 * @param integer timeout
 * @param {*} reqHeader
 */
export const postDataRequest = async (url, postData, withCreds = false, timeout = null, reqHeader = {}) => {
    const header = {...reqHeader}
    if (withCreds) {
        header.withCredentials = true;
    }
    if (timeout !== null) {
        header.timeout = timeout
    }
    
    const response = await axios.post(url, postData, header);
    return response;
};


export const deleteDataRequest = async (url, withCreds = false, timeout = null) => {
    const header = {}
    if (withCreds) {
        header.withCredentials = true;
    }
    if (timeout !== null) {
        header.timeout = timeout
    }
    const response = await axios.delete(url, header);
    return response;
};