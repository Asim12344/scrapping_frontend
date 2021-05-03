import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/'
});

// const instance = axios.create({
//     baseURL: ' https://scrapper-be.herokuapp.com/'
// });


export default instance;