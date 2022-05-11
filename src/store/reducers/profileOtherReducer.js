const initialState = {
    usuario: null,
    publications : [],
    nextPage: 1,
    follow: null,
    followMe: null,
    followers: null,
    followings: null,
    loading: true,
}

export const typesProfile = {
    loadInfo: '[profile] loadInfo',
    loadPublications: '[profile] loadPublications',
    refreshPublications: '[profile] refreshPublications',
    follow: '[profile] follow',
    unFollow: '[profile] unFollow',
    like: '[profile] like',
    unLike: '[profile] unLike',
    cleanProfileOther: '[profile] cleanProfileOther',
}

export const profileOtherReducer = (state = initialState , action) => {

    switch (action.type) {

        case typesProfile.loadPublications:
            return {
                ...state,
                publications: [...state.publications, ...action.payload.docs],
                nextPage: action.payload.nextPage,
            }

        case typesProfile.refreshPublications:
            return {
                ...state,
                publications: [...action.payload.docs],
                nextPage: action.payload.nextPage,
            }
        
        case typesProfile.loadInfo:
            return {
                ...state,
                publications: [...action.payload.publications.publicaciones.docs],
                nextPage: action.payload.publications.nextPage,
                usuario: action.payload.usuario.usuario,
                follow: action.payload.usuario.siguiendo,
                followMe: action.payload.usuario.seguido,
                followers: action.payload.seguidores,
                followings: action.payload.siguiendo,
                loading: false
            }
        
        case typesProfile.follow:
            return {
                ...state,
                follow: action.payload,
                followers: state.followers + 1
            }

        case typesProfile.unFollow:
            return {
                ...state,
                follow: !action.payload,
                followers: state.followers - 1
            }

        case typesProfile.like:
            return {
                ...state,
                publications: state.publications.map(
                    e => (e.id === action.payload) ? {...e, youLike: true, likes: e.likes +1 } : e
                )
            }

        case typesProfile.unLike:
            return {
                ...state,
                publications: state.publications.map(
                    e => (e.id === action.payload) ? {...e, youLike: false, likes: e.likes-1 } : e
                )
            }
        
        case typesProfile.cleanProfileOther:
            return{
                ...initialState,
            }

        default:
            return state;
    }

}
