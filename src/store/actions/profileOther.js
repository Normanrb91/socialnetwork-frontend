import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesProfile } from "../reducers/profileOtherReducer";


export const loadPublications = (page, idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=${page}`)
            dispatch({
                type: typesProfile.loadPublications,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const refreshPublications = (idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=1`)
            dispatch({
                type: typesProfile.refreshPublications,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadInfo = (idUsuario) =>{
    return async (dispatch) =>{
        try {
            const {data: publications} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=1`)
            const {data: usuario} = await socialNetworkApi.get(`/user/${idUsuario}`)
            const followers = await socialNetworkApi.get(`/follow/followers/${idUsuario}`)
            const followings = await socialNetworkApi.get(`/follow/followings/${idUsuario}`)

            dispatch({
                type: typesProfile.loadInfo,
                payload: {
                    usuario,
                    publications,
                    seguidores: followers.data.seguidores.totalDocs,
                    siguiendo: followings.data.siguiendo.totalDocs
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const followUser = (idUser) =>{
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.get(`/follow/${idUser}`)
            
            dispatch({
                type: typesProfile.follow,
                payload: data.ok
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const unFollowUSer = (idUsuario) =>{
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.delete(`/follow/${idUsuario}`)

            dispatch({
                type: typesProfile.unFollow,
                payload: data.ok
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const cleanProfileOther = () =>({type: typesProfile.cleanProfileOther})