const initialState = {
    publicationsHome : [],
    nextPageHome: 1,
    loadingHome: true,
    publicationActive: {
        listLikes: [],
        listComments: []
    },
}


export const typesHome = {
    loadPublicationsHome: '[home] loadPublicationsHome',
    deletePublicationHome: '[home] deletePublicationHome',
    refreshPublicationsHome: '[home] refreshPublicationsHome',
    likeHome: '[home] likeHome',
    unLikeHome: '[home] unLikeHome',
    cleanHome: '[home] cleanHome',
    updateProfileHome: '[home] updateProfileHome'
}


export const homeReducer = (state = initialState , action) => {

    switch (action.type) {
        
        case typesHome.loadPublicationsHome:
            return {
                ...state,
                publicationsHome: [...state.publicationsHome, ...action.payload.docs],
                nextPageHome: action.payload.nextPage,
                loadingHome: false
            }

        case typesHome.refreshPublicationsHome:
            return{
                ...state,
                publicationsHome: [...action.payload.docs],
                nextPageHome: action.payload.nextPage,            
            }

        case typesHome.deletePublicationHome:
            return {
                ...state,
                publicationsHome: state.publicationsHome.filter(
                    e => e.id !== action.payload.id )
            }

        case typesHome.likeHome:
            return {
                ...state,
                publicationsHome: state.publicationsHome.map(
                    e => (e.id === action.payload) ? {...e, youLike: true, likes: e.likes +1 } : e)
            }

        case typesHome.unLikeHome:
            return {
                ...state,
                publicationsHome: state.publicationsHome.map(
                    e => (e.id === action.payload) ? {...e, youLike: false, likes: e.likes -1 } : e)        
            }

        case typesHome.updateProfileHome:
            return {
                ...state,
                publicationsHome: state.publicationsHome.map(
                    e => (e.owner._id === action.payload._id) ? 
                    {...e, owner: {...e.owner, avatar: action.payload?.avatar || null, name: action.payload.name}} 
                    : e)
            }

        case typesHome.cleanHome:
            return{
                ... initialState
            }

        default:
            return state;
    }

}
