import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constans/constants";



const socialNetworkApiFetch = async (endPoint, method, contentType, data) => {
    const token = await AsyncStorage.getItem('token');
 
    return fetch(`${ BASE_URL }/${ endPoint }`, {
        method,
        headers: {
            'Content-Type': contentType,
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: data
    });
}

export default socialNetworkApiFetch