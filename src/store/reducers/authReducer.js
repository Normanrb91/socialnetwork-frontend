const initialState = {
    usuario: null,
    token: null,
    errorMessage: '',
    status: 'cheking',
    publicationsUser : [],
    publicationsHome : [],
    nextPageHome: 1,
    nextPageUser: 1,
    followers: null,
    followings: null,
    loadingHome: true,
    loadingUser: true,
}


export const typesAuth = {
    singUp: '[auth] singUp',
    addError: '[auth] addError',
    removeError: '[auth] removeError',
    noAuthenticated: '[auth] noAuthenticated',
    logout: '[auth] logout',
    loadPublicationsHome: '[auth] loadPublicationsHome',
    refreshPublicationsHome: '[auth] refreshPublicationsHome',
    loadPublicationsUser: '[auth] loadPublicationsUser',
    refreshPublicationsUser: '[auth] refreshPublicationsUser',
    like: '[auth] like',
    unLike: '[auth] unLike',
}


export const authReducer = (state = initialState , action) => {

    switch (action.type) {
        
        case typesAuth.addError:
            return {
                ...state,
                errorMessage: action.payload,
                usuario: null,
                token: null,
                status: 'noAuthenticated'
            }

        case typesAuth.removeError:
            return {
                ...state,
                errorMessage: '',
            }

        case typesAuth.singUp:
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                usuario: action.payload.usuario
            }

        case typesAuth.noAuthenticated:
        case typesAuth.logout:
            return {
                ...initialState,
                status: 'noAuthenticated',
            }

        case typesAuth.loadPublicationsHome:
            return {
                ...state,
                publicationsHome: [...state.publicationsHome, ...action.payload.docs],
                nextPageHome: action.payload.nextPage,
                loadingHome: false
            }

        case typesAuth.refreshPublicationsHome:
            return{
                ...state,
                publicationsHome: [...action.payload.docs],
                nextPageHome: action.payload.nextPage,            
            }

        case typesAuth.loadPublicationsUser: 
            return {
                ...state,
                publicationsUser: [...state.publicationsUser, ...action.payload.data],
                nextPageUser: action.payload.nextPage,
                followers: action.payload.seguidores,
                followings: action.payload.siguiendo,
                loadingUser: false
            }

        case typesAuth.refreshPublicationsUser:
            return{
                ...state,
                publicationsUser: [...action.payload.docs],
                nextPageUser: action.payload.nextPage,               
            }

        case typesAuth.like:
            return {
                ...state,
                publicationsHome: state.publicationsHome.map(
                    e => (e.id === action.payload) ? {...e, youLike: true, likes: e.likes +1 } : e),
                publicationsUser: state.publicationsUser.map(
                    e => (e.id === action.payload) ? {...e, youLike: true, likes: e.likes +1 } : e)
            }

        case typesAuth.unLike:
            return {
                ...state,
                publicationsHome: state.publicationsHome.map(
                    e => (e.id === action.payload) ? {...e, youLike: false, likes: e.likes -1 } : e),
                publicationsUser: state.publicationsUser.map(
                    e => (e.id === action.payload) ? {...e, youLike: false, likes: e.likes -1 } : e)        
            }


        default:
            return state;
    }

}

