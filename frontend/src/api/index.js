import axios from 'axios';
//mock API
let API_URL = process.env.REACT_APP_BACKEND_URL;

export const postRequest = async (endpoint,data) => {
    let url = `${API_URL}/api/${endpoint}`;
    const response2 = await axios.post(url,data).then((response) => {
        console.log(response);
        return response;
      }).catch(err => {
        console.log("API Post Error");
        console.log(err);
    })
    return response2;;
};


export const putRequest = async (endpoint,data) => {
    let url = `${API_URL}/api/${endpoint}`;
    const response2 = await axios.put(url,data).then((response) => {
        console.log(response);
        return response;
      }).catch(err => {
        console.log("API Put Error");
        console.log(err);
    })
    return response2;;
};

export const getRequest = (endpoint) => {
    let url = `${API_URL}/api/${endpoint}`;
    let response = axios.get(url);
    return response;
    };

export const fetchData = async (endpoint) => {
    try {
        let url = `${API_URL}/api/${endpoint}`;
        const response = await axios.get(url);
        return response.data; // Assuming your data is an array of items
    } catch (error) {
        throw error;
    }
    };
    