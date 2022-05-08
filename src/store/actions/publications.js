
import socialNetworkApi from "../../libs/api/socialNetwork";
import { types } from "../reducers/publicationsReducer";


export const loadPublications = (page) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications?page=${page}`)

            dispatch({
                type: types.loadPublications,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const refreshPublications = () =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get('/publications?page=1')
            
            dispatch({
                type: types.refreshPublications,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const cleanPublications = () =>({type: types.cleanPublications})


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