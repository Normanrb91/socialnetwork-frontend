import socialNetworkApi from "../../libs/api/socialNetwork";
import { typesProfileOther } from "../reducers/profileOtherReducer";
import { typesProfile } from "../reducers/profileReducer";
import { typesPublicationActive } from "../reducers/publicationActiveReducer";



export const loadPublicationsOther = (page, idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=${page}`)
            dispatch({
                type: typesProfileOther.loadPublicationsProfileOther,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }

    }
}


export const refreshPublicationsOther = (idUsuario) =>{
    return async (dispatch) =>{
        
        try {
            const {data} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=1`)
            dispatch({
                type: typesProfileOther.refreshPublicationsProfileOther,
                payload: data.publicaciones
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadFollowersProfileOther = (page, idUsuario) => {
    return async (dispatch) =>{

        try {
            const { data } = await socialNetworkApi.get(`/follow/followers/${idUsuario}?page=${page}`)

            dispatch({
                type: typesProfileOther.loadFollowersProfileOther,
                payload: data.seguidores
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const refreshFollowersProfileOther = (idUsuario) => {
    return async (dispatch) =>{

        try {
            const { data } = await socialNetworkApi.get(`/follow/followers/${idUsuario}?page=1`)
            dispatch({
                type: typesProfileOther.refreshFollowersProfileOther,
                payload: data.seguidores
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadFollowingsProfileOther = (page, idUsuario) => {
    return async (dispatch) =>{

        try {
            const { data } = await socialNetworkApi.get(`/follow/followings/${idUsuario}?page=${page}`)

            dispatch({
                type: typesProfileOther.loadFollowingsProfileOther,
                payload: data.siguiendo
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const refreshFollowingsProfileOther = (idUsuario) => {
    return async (dispatch) =>{

        try {
            const { data } = await socialNetworkApi.get(`/follow/followings/${idUsuario}?page=1`)
            dispatch({
                type: typesProfileOther.refreshFollowingsProfileOther,
                payload: data.siguiendo
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const loadInfoOther = (idUsuario) =>{
    return async (dispatch) =>{
        try {
            const {data: publicaciones} = await socialNetworkApi.get(`/publications/all/${idUsuario}?page=1`)
            const {data: usuario} = await socialNetworkApi.get(`/user/${idUsuario}`)
            const {data: followers} = await socialNetworkApi.get(`/follow/followers/${idUsuario}`)
            const {data: followings} = await socialNetworkApi.get(`/follow/followings/${idUsuario}`)

            dispatch({
                type: typesProfileOther.loadInfoProfileOther,
                payload: {
                    usuario,
                    publicaciones: publicaciones.publicaciones,
                    seguidores: followers.seguidores,
                    siguiendo: followings.siguiendo
                }
            });
            
        } catch (error) {
            console.log('error');
        }
    }
}


export const followUser = (idUser) =>{
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.get(`/follow/${idUser}`)
            if(data.ok){
                dispatch({
                    type: typesProfile.follow,
                    payload: {id: idUser}
                })
                dispatch({
                    type: typesProfileOther.follow,
                    payload: {ok: data.ok, id: idUser}
                })
                dispatch({
                    type: typesPublicationActive.follow,
                    payload: {ok: data.ok, id: idUser}
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const unFollowUSer = (idUser) =>{
    return async (dispatch) =>{
        try {
            const { data } = await socialNetworkApi.delete(`/follow/${idUser}`)
            if(data.ok){
                dispatch({
                    type: typesProfile.unFollow,
                    payload: {id: idUser}
                });
                dispatch({
                    type: typesProfileOther.unFollow,
                    payload: {ok: data.ok, id: idUser}
                });
                dispatch({
                    type: typesPublicationActive.unFollow,
                    payload: {ok: data.ok, id: idUser}
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
}



// export const followUser = (idUser) =>{
//     return async (dispatch, getState) =>{

//         const { _id } = getState().profileOther.usuarioOther;

//         try {
//             const { data } = await socialNetworkApi.get(`/follow/${idUser}`)
//             if(data.ok){
//                 dispatch(refreshFollowingsProfileOther(_id))
//                 dispatch(refreshFollowersProfileOther(_id))
//                 dispatch(unFollowUSerProfile())
//             }

//             if(idUser === _id){
//                 dispatch({
//                     type: typesProfileOther.follow,
//                     payload: data.ok
//                 });
//             }
            
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


// export const unFollowUSer = (idUsuario) =>{
//     return async (dispatch, getState) =>{

//         const {_id} = getState().profileOther.usuarioOther;

//         try {
//             const { data } = await socialNetworkApi.delete(`/follow/${idUsuario}`)
//             if(data.ok){
//                 dispatch(refreshFollowingsProfileOther(_id))
//                 dispatch(refreshFollowersProfileOther(_id))

//                 dispatch(unFollowUSerProfile())
//             }

//             if(idUsuario === _id){
//                 dispatch({
//                     type: typesProfileOther.unFollow,
//                     payload: data.ok
//                 })
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }


export const cleanProfileOther = () =>({type: typesProfileOther.cleanProfileOther})