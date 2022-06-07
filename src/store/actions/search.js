import socialNetworkApi from "../../libs/api/socialNetwork";
import { typeSearch } from "../reducers/searchReducer";


export const searchUser = (argument) => {
    return async (dispatch) =>{
        
        try {
            dispatch({type: typeSearch.starSearch})

            const {data} = await socialNetworkApi.get(`/user/search/${argument}`)

            if(data.ok){
                dispatch({
                    type: typeSearch.searchSuccess,
                    payload: data.usuarios
                });
            }else{
                dispatch({type: typeSearch.searchError})
            }

        } catch (error) {
            console.log(error);
            dispatch({type: typeSearch.searchError})
        }
    }
}

export const loadSearchUser = (page) => {
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/user/search/${argument}/?page=${page}`)
            
            if(data.ok){
                dispatch({
                    type: typeSearch.laodSearchUser,
                    payload: data.usuarios
                });
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const cleanSearch = () => ({type: typeSearch.cleanSearch})