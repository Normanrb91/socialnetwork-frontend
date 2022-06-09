import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesPublicationActive } from "../reducers/publicationActiveReducer";


export const loadListLikes = (page) => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications?page=${page}`)

            if(data.ok){

            }
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const loadListComments = (page) => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications?page=${page}`)

            if(data.ok){

            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const refreshListComments = () => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get('/publications?page=1')

            if(data.ok){

            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteComent = (idComent) => {
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.delete(`/publications/delete/${idPublication}`)

            
            if(data.ok){

            }
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const newComment = (text) => {
    return async (dispatch) =>{
        try {
            
            const { data } = await socialNetworkApi.delete(`/publications/delete/${idPublication}`)

            
            if(data.ok){

            }
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const cleanPublicationActive = () => ({type: typesPublicationActive.cleanPublicationActive})