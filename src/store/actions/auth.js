import AsyncStorage from '@react-native-async-storage/async-storage';
import socialNetworkApi from "../../libs/api/socialNetwork";
import socialNetworkApiFetch from '../../libs/api/socialNetworkFetch';
import { typesAuth } from "../reducers/authReducer";
import { typesHome } from '../reducers/homeReducer';
import { typesProfileOther } from '../reducers/profileOtherReducer';
import { typesProfile } from '../reducers/profileReducer';
import { typesPublicationActive } from '../reducers/publicationActiveReducer';
import { typeSearch } from '../reducers/searchReducer';


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
            dispatch({type: typesHome.cleanHome});
            dispatch({type: typesProfile.cleanProfile});
            dispatch({type: typesProfileOther.cleanProfileOther});
            dispatch({type: typesPublicationActive.cleanPublicationActive});
            dispatch({type: typeSearch.cleanSearch});
            
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



export const startUpdateProfile = (name, biography, image) => {
    return async (dispatch, ) => {
        const noImage = '../../assets/noimage.png';

        try {
            dispatch({type: typesProfile.loading});

            if(image !== null && image !== noImage){
                const fileToUpload = {
                    uri: image.uri,
                    name: image.fileName,
                    type: image.type
                }
                
                const formData = new FormData();
                formData.append('image', fileToUpload)
                await socialNetworkApiFetch('user/avatar', 'POST', 'multipart/form-data', formData)
    
            }else if(image === noImage){
                await socialNetworkApi.delete('/user/avatar')
            }
            
            const {data} = await socialNetworkApi.post('/user/update', {name, biography})

            if(data.ok){
                dispatch({
                    type: typesAuth.updateProfile,
                    payload: data
                });

                dispatch({
                    type: typesHome.updateProfileHome,
                    payload: data.usuario
                })

                dispatch({
                    type: typesProfile.updateProfileMe,
                    payload: data.usuario
                })
            }

        } catch (error) {
            console.log(error);
        }

    }
}




