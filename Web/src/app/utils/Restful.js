import axios from 'axios';
import configData from "../../config.json";
const SERVER_URL = configData.SERVER_URL
export default async function callApi(url, method, data) {
    if (method == 'GET') {
        try {
            let query = "?" + Object.keys(data)
                .map(function (key) {
                    return key + "=" + data[key];
                })
                .join("&");
            let response = await axios.get(
                SERVER_URL + url + query,
                { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken-yts')}` } }
            );
            return {
                status: response.status,
                data: response.data
            }
        } catch (err) {
            console.log(err)
            return {
                status: err.response.status,
                data: err.response.data
            }
        }
    } else if (method == 'POST') {
        try {
            let response = await axios.post(
                SERVER_URL + url,
                data,
                {
                    'headers': {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken-yts')}`
                    },
                }
            );
            return {
                status: response.status,
                data: response.data
            }
        } catch (err) {
            console.log(err)
            return {
                status: err.response.status,
                data: err.response.data
            }
        }
    }
}
