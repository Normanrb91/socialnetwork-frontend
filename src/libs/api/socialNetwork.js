import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../constans/constants";


const baseURL = BASE_URL

const socialNetworkApi = axios.create({baseURL})

socialNetworkApi.interceptors.request.use(
    
    async(config) => {
        const token = await AsyncStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }
)


export default socialNetworkApi