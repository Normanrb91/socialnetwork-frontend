const initialState = {
    usuarioOther: null,
    publicationsProfileOther : [],
    nextPageProfileOther: 1,
    follow: null,
    followMe: null,
    followersOther: {
        num: null,
        nextPage: 1,
        user: []
    },
    followingsOther: {
        num: null,
        nextPage: 1,
        user: []
    },
    loadingProfileOther: true,
}


export const typesProfileOther = {
    loadInfoProfileOther: '[profileOther] loadInfoProfileOther',
    loadPublicationsProfileOther: '[profileOther] loadPublicationsProfileOther',
    refreshPublicationsProfileOther: '[profileOther] refreshPublicationsProfileOther',
    loadFollowersProfileOther: '[profileOther] loadFollowersProfileOther',
    refreshFollowersProfileOther: '[profileOther] refreshFollowersProfileOther',
    loadFollowingsProfileOther: '[profileOther] loadFollowingsProfileOther',
    refreshFollowingsProfileOther: '[profileOther] refreshFollowingsProfileOther',
    follow: '[profileOther] follow',
    unFollow: '[profileOther] unFollow',
    likeOther: '[profileOther] likeOther',
    unLikeOther: '[profileOther] unLikeOther',
    cleanProfileOther: '[profileOther] cleanProfileOther',
}

export const profileOtherReducer = (state = initialState , action) => {

    switch (action.type) {

        case typesProfileOther.loadPublicationsProfileOther:
            return {
                ...state,
                publicationsProfileOther: [...state.publicationsProfileOther, ...action.payload.docs],
                nextPageProfileOther: action.payload.nextPage,
            }

        case typesProfileOther.refreshPublicationsProfileOther:
            return {
                ...state,
                publicationsProfileOther: [...action.payload.docs],
                nextPageProfileOther: action.payload.nextPage,
            }
    
        case typesProfileOther.loadFollowersProfileOther:
            return{
                ...state,
                followersOther: {
                    num: action.payload.totalDocs,
                    user: [...state.followersOther.user, ...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }
        
        case typesProfileOther.refreshFollowersProfileOther:
            return{
                ...state,
                followersOther: {
                    num: action.payload.totalDocs,
                    user: [...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }

        case typesProfileOther.loadFollowingsProfileOther:
            return{
                ...state,
                followingsOther: {
                    num: action.payload.totalDocs,
                    user: [...state.followingsOther.user, ...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }

        case typesProfileOther.refreshFollowingsProfileOther:
            return{
                ...state,
                followingsOther: {
                    num: action.payload.totalDocs,
                    user: [...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }

        case typesProfileOther.loadInfoProfileOther:
            return {
                ...state,
                publicationsProfileOther: [...action.payload.publicaciones.docs],
                nextPageProfileOther: action.payload.publicaciones.nextPage,
                usuarioOther: action.payload.usuario.usuario,
                follow: action.payload.usuario.siguiendo,
                followMe: action.payload.usuario.seguido,
                followersOther: {
                    num: action.payload.seguidores.totalDocs,
                    user: [...action.payload.seguidores.docs],
                    nextPage: action.payload.seguidores.nextPage
                },
                followingsOther: {
                    num: action.payload.siguiendo.totalDocs,
                    user: [ ...action.payload.siguiendo.docs],
                    nextPage: action.payload.siguiendo.nextPage
                },
                loadingProfileOther: false
            }

        case typesProfileOther.follow:
            return {
                ...state,
                follow: action.payload.id === state.usuarioOther?._id ? action.payload.ok : state.follow,
                followersOther: {
                    ...state.followersOther,
                    num: action.payload.id === state.usuarioOther?._id ? state.followersOther.num + 1 : state.followersOther.num,
                    user: state.followersOther.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : true} : e )
                },
                followingsOther:{
                    ...state.followingsOther,
                    user: state.followingsOther.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : true} : e ) 
                }
            }
        
        case typesProfileOther.unFollow:
            return {
                ...state,
                follow: action.payload.id === state.usuarioOther?._id ? !action.payload.ok : state.follow,
                followersOther: {
                    ...state.followersOther,
                    num: action.payload.id === state.usuarioOther?._id ? state.followersOther.num - 1 : state.followersOther.num,
                    user: state.followersOther.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : false} : e )
                },
                followingsOther:{
                    ...state.followingsOther,
                    user: state.followingsOther.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : false} : e )
                }
            }
        
        case typesProfileOther.likeOther:
            return {
                ...state,
                publicationsProfileOther: state.publicationsProfileOther.map(
                    e => (e.id === action.payload) ? {...e, youLike: true, likes: e.likes +1 } : e
                )
            }

        case typesProfileOther.unLikeOther:
            return {
                ...state,
                publicationsProfileOther: state.publicationsProfileOther.map(
                    e => (e.id === action.payload) ? {...e, youLike: false, likes: e.likes-1 } : e
                )
            }
        
        case typesProfileOther.cleanProfileOther:
            return{
                ...initialState,
            }

        default:
            return state;
    }

}
