import socialNetworkApi from "../../libs/api/socialNetwork";
import { types } from "../reducers/profileReducer";


export const loadPublicationsUSer = (page, idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=${page}`)
            dispatch({
                type: types.loadPublicationsUser,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const refreshPublicationsUSer = (idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=1`)
            dispatch({
                type: types.refreshPublicationsUser,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log('error qui');
        }

    }
}

export const loadInfoUser = (idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/user/${idUsuario}`)
            
            dispatch({
                type: types.loadInfoUser,
                payload: data
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const loadNumberFollowers = (idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const followers = await socialNetworkApi.get(`/follow/followers/${idUsuario}`)
            const followings = await socialNetworkApi.get(`/follow/followings/${idUsuario}`)
            


            dispatch({
                type: types.loadNumberFollowers,
                payload: {
                    seguidores: followers.data.seguidores.totalDocs,
                    siguiendo: followings.data.siguiendo.totalDocs
                }
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const darLike = (idPublication) =>{
    return async () =>{
        try {
            await socialNetworkApi.post(`/like/${idPublication}`)

        } catch (error) {
            console.log(error);
        }
    }
}


export const quitarLike = (idPublication) =>{
    return async () =>{
        try {
            await socialNetworkApi.delete(`/like/${idPublication}`)
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const cleanProfile = () =>({type: types.cleanProfile})