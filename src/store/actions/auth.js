import AsyncStorage from '@react-native-async-storage/async-storage';
import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesAuth } from "../reducers/authReducer";
import { typesProfile } from '../reducers/profileOtherReducer';


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



export const loadPublicationsHome = (page) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications?page=${page}`)

            dispatch({
                type: typesAuth.loadPublicationsHome,
                payload: data.publicaciones,
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const refreshPublicationsHome = () =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get('/publications?page=1')

            dispatch({
                type: typesAuth.refreshPublicationsHome,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadPublicationsUser = (page) =>{
    return async (dispatch, getState) =>{

        const { _id: idUsuario } = getState().auth.usuario;

        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=${page}`)
            const followers = await socialNetworkApi.get(`/follow/followers/${idUsuario}`)
            const followings = await socialNetworkApi.get(`/follow/followings/${idUsuario}`)

            dispatch({
                type: typesAuth.loadPublicationsUser,
                payload: {
                    data: data.publicaciones.docs,
                    nextPage: data.publicaciones.nextPage,
                    seguidores: followers.data.seguidores.totalDocs,
                    siguiendo: followings.data.siguiendo.totalDocs
                }
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const refreshPublicationsUser = () =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get('/publications?page=1')

            dispatch({
                type: typesAuth.refreshPublicationsUser,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const darLike = (idPublication) =>{
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.post(`/like/${idPublication}`)
            
            dispatch({
                type: typesAuth.like,
                payload: data.like.publication
            });

            dispatch({
                type: typesProfile.like,
                payload: data.like.publication
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const quitarLike = (idPublication) =>{
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.delete(`/like/${idPublication}`)
            dispatch({
                type: typesAuth.unLike,
                payload: data.unLike.publication
            });

        
            dispatch({
                type: typesProfile.unLike,
                payload: data.unLike.publication
            });

        } catch (error) {
            console.log(error);
        }
    }
}
