
import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesHome } from "../reducers/homeReducer";
import { typesProfileOther } from "../reducers/profileOtherReducer";
import { typesProfile } from "../reducers/profileReducer";


export const loadPublicationsHome = (page) => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications?page=${page}`)

            dispatch({
                type: typesHome.loadPublicationsHome,
                payload: data.publicaciones,
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const refreshPublicationsHome = () => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get('/publications?page=1')

            dispatch({
                type: typesHome.refreshPublicationsHome,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const darLike = (idPublication) => {
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.post(`/like/${idPublication}`)

            dispatch({
                type: typesHome.likeHome,
                payload: data.like.publication
            });

            dispatch({
                type: typesProfile.likeProfile,
                payload: data.like.publication
            });

            dispatch({
                type: typesProfileOther.likeOther,
                payload: data.like.publication
            });

        } catch (error) {
            console.log(error);
        }
    }
}

export const quitarLike = (idPublication) => {
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.delete(`/like/${idPublication}`)

            dispatch({
                type: typesHome.unLikeHome,
                payload: data.unLike.publication
            });

            dispatch({
                type: typesProfile.unLikeProfile,
                payload: data.unLike.publication
            });

            dispatch({
                type: typesProfileOther.unLikeOther,
                payload: data.unLike.publication
            });

        } catch (error) {
            console.log(error);
        }
    }
}

export const cleanHome = () => ({type: typesHome.cleanHome})