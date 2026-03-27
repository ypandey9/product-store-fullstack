import axios from 'axios';

const API =axios.create({
    baseURL: "https://miniature-winner-7v76w6rv5q4hrgjr-5000.app.github.dev/api",
});

//Attach token automatically 
API.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token");

    if(token) {
        req.headers.Authorization=`Bearer ${token}`;
    }

    return req;
});

export default API;