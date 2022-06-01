import AsyncStorage from '@react-native-async-storage/async-storage';
import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesAuth } from "../reducers/authReducer";


export const startSingIn = (email, password) => {
    return async (dispatch) => {

        try {
            const {data} = await socialNetworkApi.post('/auth/login', {email, password})

            dispatch({
                type: typesAuth.singUp,
                payload: data
            });

            await AsyncStorage.setItem('token', data.token)

        } catch (error) {
            dispatch({
                type: typesAuth.addError,
                payload: error.response.data.msg || 'Información incorrecta'
            });
        }
    }
}


export const checkToken = () => {
    return async (dispatch) => {

        try {
            const token = await AsyncStorage.getItem('token')
           
            if(!token) return dispatch({type: typesAuth.noAuthenticated})
    
            const {data} = await socialNetworkApi.get('/auth/checkToken')   
            dispatch({
                type: typesAuth.singUp,
                payload: data
            });
            
        } catch (error) {
            dispatch({type: typesAuth.noAuthenticated})
        }
    }
}


export const startLogout = (logout) => {
    return async (dispatch) => {

        try {
            await socialNetworkApi.get(`/auth/${logout}`)
            await AsyncStorage.removeItem('token')
            dispatch({type: typesAuth.logout});
            
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
                type: typesAuth.singUp,
                payload: data
            });

            await AsyncStorage.setItem('token', data.token)

        } catch (error) {
            dispatch({
                type: typesAuth.addError,
                payload: error.response.data.msg || 'Información incorrecta'
            });
        }
    }
}


export const removeError = () => ({type: typesAuth.removeError})


export const startUpdateProfile = (name, biography, avatar) => {
    return async (dispatch) => {

        const fileToUpload = {
            uri: avatar.uri,
            name: avatar.fileName,
            type: avatar.type
        }
        const formData = new FormData();
        formData.append('image', fileToUpload)

        console.log(formData);

        try {
            //const {data} = await socialNetworkApi.post('/user/update', {name, biography})

            const {data: img} = await socialNetworkApi.post('/user/avatar/perfil', formData)
            console.log(img);
            if(data.img){
                dispatch({
                    type: typesAuth.updateProfile,
                    payload: img
                });
            }

        } catch (error) {
            console.log(error);
        }

    }
}


