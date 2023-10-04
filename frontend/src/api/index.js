import axios from 'axios';
let API_URL = process.env.REACT_APP_BACKEND_URL;

export const postRequest = async (endpoint,data) => {
    let url = `${API_URL}/api/${endpoint}`;
    const response2 = await axios.post(url,data).then((response) => {
        // console.log(response);
        return response;
      }).catch(err => {
        console.log("API Post Error");
        // console.log(err);
        return err.response.status;
    })
    return response2;;
};

export const deleteRequest = async (endpoint,data) => {
    let url = `${API_URL}/api/${endpoint}`;
    const response2 = await axios.delete(url,data).then((response) => {
        // console.log(response);
        return response;
      }).catch(err => {
        console.log("API Delete Error");
        // console.log(err);
        return err.response.status;
    })
    return response2;;
};


export const putRequest = async (endpoint,data) => {
    let url = `${API_URL}/api/${endpoint}`;
    const response2 = await axios.put(url,data).then((response) => {
        // console.log(response);
        return response;
      }).catch(err => {
        console.log("API Put Error");
        // console.log(err);
        return err.response.status;
    })
    return response2;;
};

export const getRequest = (endpoint) => {
    let url = `${API_URL}/api/${endpoint}`;
    let response2 = axios.get(url).then((response) => {
        // console.log(response);
        return response;
      }).catch(err => {
        console.log("API Get Error");
        return err.response.status;
    })
    return response2;;;
};


export const fetchData = async (endpoint) => {
    let url = `${API_URL}/api/${endpoint}`;
    const response2 = await axios.get(url).then((response) => {
        return response.data;
        }).catch(err => {
        console.log("API Get Error");
        return err.response.status;
    })
    return response2;
};
   
    