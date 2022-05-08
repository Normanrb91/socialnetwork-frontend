const initialState = {
    user: {},
    publications : [],
    nextPage: 1,
    follow: null,
    followMe: null,
    followers: null,
    followings: null,
    loading: true

}

export const types = {
    loadPublicationsUser: '[profile] loadPublicationsUser',
    refreshPublicationsUser: '[profile] refreshPublicationUser',
    loadInfoUser: '[profile] loadInfoUser',
    loadNumberFollowers: '[profile] loadNumberFollowers',
    cleanProfile: '[profile] cleanProfile',
}

export const profileReducer = (state = initialState , action) => {

    switch (action.type) {

        case types.loadPublicationsUser:
            return {
                ...state,
                publications: [...state.publications, ...action.payload.docs],
                nextPage: action.payload.nextPage,
            }

        case types.refreshPublicationsUser:
            return {
                ...state,
                publications: [...action.payload.docs],
                nextPage: action.payload.nextPage,
            }
        
        case types.loadInfoUser:
            return {
                ...state,
                user: action.payload.usuario,
                follow: action.payload.siguiendo,
                followMe: action.payload.seguido,
            }

        case types.loadNumberFollowers:
            return {
                ...state,
                followers: action.payload.seguidores,
                followings: action.payload.siguiendo,
                loading: false
            }
        
        case types.cleanProfile:
            return{
                ... initialState,
                loading: false
            }

        default:
            return state;
    }

}
