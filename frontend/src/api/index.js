import axios from 'axios';
//mock API
let API_URL = process.env.REACT_APP_BACKEND_URL;

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log("API Error");
        console.log(err);
    });
}

export const getRequest = (endpoint) => {
    let url = `${API_URL}/${endpoint}`;
    let response = axios.get(url);
    return response;
    };

export const fetchData = async (endpoint) => {
    try {
        let url = `${API_URL}/${endpoint}`;
        const response = await axios.get(url);
        return response.data; // Assuming your data is an array of items
    } catch (error) {
        throw error;
    }
    };
    