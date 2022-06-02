const initialState = {
    publicationsProfile : [],
    nextPageProfile: 1,
    followers: {
        num: null,
        nextPage: 1,
        user: []
    },
    followings: {
        num: null,
        nextPage: 1,
        user: []
    },
    loadingProfile: true,
}


export const typesProfile = {
    loadPublicationsProfile: '[profile] loadPublicationsProfile',
    refreshPublicationsProfile: '[profile] refreshPublicationsProfile',
    addPublicationProfile: '[profile] addPublicationProfile',
    deletePuplicationProfile: '[profile] deletePuplicationProfile',
    loadFollowersProfile: '[profile] loadFollowersProfile',
    refreshFollowersProfile: '[profile] refreshFollowersProfile',
    loadFollowingsProfile: '[profile] loadFollowingsProfile',
    refreshFollowingsProfile: '[profile] refreshFollowingsProfile',
    follow: '[profile] follow',
    unFollow: '[profile] unFollow',
    likeProfile: '[profile] likeProfile',
    unLikeProfile: '[profile] unLikeProfile',
    cleanProfile: '[profile] cleanProfile',
    updateProfileMe: '[profile] updateProfileMe',
    loading: '[profile] loading'
}


export const profileReducer = (state = initialState , action) => {

    switch (action.type) {
        
        case typesProfile.loadPublicationsProfile: 
            return {
                ...state,
                publicationsProfile: [...state.publicationsProfile, ...action.payload.docs],
                nextPageProfile: action.payload.nextPage,
                loadingProfile: false
            }

        case typesProfile.refreshPublicationsProfile:
            return{
                ...state,
                publicationsProfile: [...action.payload.docs],
                nextPageProfile: action.payload.nextPage,               
            }

        case typesProfile.deletePuplicationProfile:
            return {
                ...state,
                publicationsProfile: state.publicationsProfile.filter(
                    e => e.id !== action.payload.id )
            }

        case typesProfile.loadFollowersProfile:
            return{
                ...state,
                followers: {
                    num: action.payload.totalDocs,
                    user: [...state.followers.user, ...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }
        
        case typesProfile.refreshFollowersProfile:
            return{
                ...state,
                followers: {
                    num: action.payload.totalDocs,
                    user: [...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }

        case typesProfile.loadFollowingsProfile:
            return{
                ...state,
                followings: {
                    num: action.payload.totalDocs,
                    user: [...state.followings.user, ...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }

        case typesProfile.refreshFollowingsProfile:
            return{
                ...state,
                followings: {
                    num: action.payload.totalDocs,
                    user: [...action.payload.docs],
                    nextPage: action.payload.nextPage
                }
            }

        case typesProfile.follow:
            return {
                ...state,
                followers: {
                    ...state.followers,
                    user: state.followers.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : true} : e )
                },
                followings:{
                    ...state.followings,
                    num: state.followings.num + 1,
                    user: state.followings.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : true} : e )
                }
            }

        case typesProfile.unFollow:
            return {
                ...state,
                followers: {
                    ...state.followers,
                    user: state.followers.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : false} : e )
                },
                followings:{
                    ...state.followings,
                    num: state.followings.num - 1,
                    user: state.followings.user.map(
                        e => e.id === action.payload.id ? {...e, siguiendo : false} : e )
                }
            }            

        case typesProfile.likeProfile:
            return {
                ...state,
                publicationsProfile: state.publicationsProfile.map(
                    e => (e.id === action.payload) ? {...e, youLike: true, likes: e.likes +1 } : e)
            }

        case typesProfile.unLikeProfile:
            return {
                ...state,
                publicationsProfile: state.publicationsProfile.map(
                    e => (e.id === action.payload) ? {...e, youLike: false, likes: e.likes -1 } : e)        
            }
    
        case typesProfile.cleanProfile:
            return{
                ... initialState
            }

        case typesProfile.loading:
            return{
                ...state,
                loadingProfile: true
            }

        case typesProfile.updateProfileMe:
            return {
                ...state,
                publicationsProfile: state.publicationsProfile.map(
                    e => (e.owner._id === action.payload._id) ? 
                    {...e, owner: {...e.owner, avatar: action.payload?.avatar || null, name: action.payload.name}} 
                    : e),
                loadingProfile: false      
            }

        default:
            return state;
    }

}

