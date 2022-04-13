import AsyncStorage from '@react-native-async-storage/async-storage';
import socialNetworkApi from "../../libs/api/socialNetwork";
import { types } from "../reducers/authReducer";


export const startSingIn = (email, password) => {
    return async (dispatch) => {

        try {
            const {data} = await socialNetworkApi.post('/auth/login', {email, password})
            dispatch({
                type: types.singUp,
                payload: data
            });

            await AsyncStorage.setItem('token', data.token)

        } catch (error) {
            dispatch({
                type: types.addError,
                payload: error.response.data.msg || 'Información incorrecta'
            });
        }
    }
}


export const checkToken = () => {
    return async (dispatch) => {

        try {
            const token = await AsyncStorage.getItem('token')
            if(!token) return dispatch({type: types.noAuthenticated})
    
            const {data} = await socialNetworkApi.get('/auth/checkToken')   
            dispatch({
                type: types.singUp,
                payload: data
            });
            
        } catch (error) {
            dispatch({type: types.noAuthenticated})
        }
    }
}


export const startLogout = (logout) => {
    return async (dispatch) => {

        try {
            await socialNetworkApi.get(`/auth/${logout}`)
            await AsyncStorage.removeItem('token')
            dispatch({type: types.logout});
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const startSingUp = (name, email, password) => {
    return async (dispatch) => {

        try {
            const {data} = await socialNetworkApi.post('/auth/new', {name, email, password})
            dispatch({
                type: types.singUp,
                payload: data
            });

            await AsyncStorage.setItem('token', data.token)

        } catch (error) {
            dispatch({
                type: types.addError,
                payload: error.response.data.msg || 'Información incorrecta'
            });
        }
    }
}


export const removeError = () => ({type: types.removeError})