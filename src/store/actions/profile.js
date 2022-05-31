import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesHome } from "../reducers/homeReducer";
import { typesProfile } from "../reducers/profileReducer";



export const loadPublicationsProfile = (page) => {
    return async (dispatch, getState) =>{

        const { _id: idUsuario } = getState().auth.usuario;

        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=${page}`)
            dispatch({
                type: typesProfile.loadPublicationsProfile,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const refreshPublicationsProfile = () => {
    return async (dispatch, getState) =>{

        const { _id: idUsuario } = getState().auth.usuario;
        
        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=1`)

            dispatch({
                type: typesProfile.refreshPublicationsProfile,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadFollowersProfile = (page) => {
    return async (dispatch, getState) =>{

        const { _id: idUsuario } = getState().auth.usuario;

        try {
            const { data } = await socialNetworkApi.get(`/follow/followers/${idUsuario}?page=${page}`)

            dispatch({
                type: typesProfile.loadFollowersProfile,
                payload: data.seguidores
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const refreshFollowersProfile = () => {
    return async (dispatch, getState) =>{

        const { _id: idUsuario } = getState().auth.usuario;

        try {
            const { data } = await socialNetworkApi.get(`/follow/followers/${idUsuario}?page=1`)

            dispatch({
                type: typesProfile.refreshFollowersProfile,
                payload: data.seguidores
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadFollowingsProfile = (page) => {
    return async (dispatch, getState) =>{

        const { _id: idUsuario } = getState().auth.usuario;

        try {
            const { data } = await socialNetworkApi.get(`/follow/followings/${idUsuario}?page=${page}`)

            dispatch({
                type: typesProfile.loadFollowingsProfile,
                payload: data.siguiendo
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const refreshFollowingsProfile = () => {
    return async (dispatch, getState) =>{

        const { _id: idUsuario } = getState().auth.usuario;

        try {
            const { data } = await socialNetworkApi.get(`/follow/followings/${idUsuario}?page=1`)
            dispatch({
                type: typesProfile.refreshFollowingsProfile,
                payload: data.siguiendo
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const deletePublication = (idPublication) => {
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.delete(`/publications/delete/${idPublication}`)

            console.log(data);
            if(data.ok){
                dispatch({
                    type: typesProfile.deletePuplicationProfile,
                    payload: {id: idPublication}
                });

                dispatch({
                    type: typesHome.deletePublicationHome,
                    payload: {id: idPublication}
                });
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const cleanHome = () => ({type: typesProfile.cleanProfile})