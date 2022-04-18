
import socialNetworkApi from "../../libs/api/socialNetwork";
import { types } from "../reducers/publicationReducer";


export const startPublication = ({page}) =>{
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


export const startCleanPublication = () =>({type: types.cleanPublications})