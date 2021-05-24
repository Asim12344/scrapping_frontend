import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.133.103.240:80/'
});

// const instance = axios.create({
//     baseURL: 'http://localhost:8000/'
// });

// const instance = axios.create({
//     baseURL: ' https://scrapper-be.herokuapp.com/'
// });


export default instance;