import axios from "axios";
// import store from "../../store/store";
import {store} from "../store/store";
export const baseApi = axios.create({
    baseURL:"http://localhost:8002/api",
    timeout:10000,
    withCredentials: true,
    headers:{
        'Content-Type':"application/json"
    }
});

// this is for do something before API call req ! 
baseApi.interceptors.request.use(
    (config)=>{
        const token = store.getState().token;
        console.log("token:",token);
        if(token){
                config.headers.Authorization = `Bearer ${token}`;            
        }else{
            console.log("no token found !")
        } 
        return config;  // ✅ MUST return config

    },
    async (error)=>{
        console.log("error:",error)
        return await Promise.reject(error);
    }
)

