import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://blog-management-ea4c4-default-rtdb.firebaseio.com/'
});

export default instance;