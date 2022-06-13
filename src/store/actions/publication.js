import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesPublicationActive } from "../reducers/publicationActiveReducer";


export const loadListLikes = (idPubli, page) => {
    return async (dispatch) =>{
       
        try {
            const {data} = await socialNetworkApi.get(`/like/listaLike/${idPubli}?page=${page}`)
            if(data.ok){
                dispatch({
                    type: typesPublicationActive.loadListLikes,
                    payload: data.usuarios
                });
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const loadListComments = (idPubli, page) => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/comment/${idPubli}?page=${page}`)
            
            if(data.ok){
                dispatch({
                    type: typesPublicationActive.loadListComments,
                    payload: data.comentarios
                })
            }
        } catch (error) {
            console.log(error);
        }

    }
}

export const refreshListComments = (idPubli) => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/comment/${idPubli}?page=1`)
            
            if(data.ok){
                dispatch({
                    type: typesPublicationActive.refreshListComments,
                    payload: data.comentarios
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteComent = (idComent) => {
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.delete(`comment/delete/${idComent}`)
        
            if(data.ok){
                dispatch({
                    type: typesPublicationActive.deleteComment,
                    payload: data.id
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const newComment = (text, idPublication) => {
    console.log(text, idPublication);
    return async (dispatch) =>{
        try {
            
            const { data } = await socialNetworkApi.post(`/comment/new/${idPublication}`, {text})

            if(data.ok){
                dispatch({
                    type: typesPublicationActive.newComment,
                    payload: data
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const cleanPublicationActive = () => ({type: typesPublicationActive.cleanPublicationActive})