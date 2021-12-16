import axios from 'axios'

export const API = axios.create({
    baseURL : 'https://literature-backend.herokuapp.com/api199/v1/' || "http://localhost:3009/api199/v1/"
})

export const setAuthToken = (token) =>{
    if(token){
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        delete API.defaults.headers.common['Authorization']
    }
}