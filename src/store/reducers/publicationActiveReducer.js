const initialState = {
    publicationId: undefined,
    listLikes: [],
    listComments: [],
    pageLikes: undefined,
    pageComments: undefined,
    loading: true,
}

export const typesPublicationActive = {
    loadListLikes: '[publicationActive] loadListLikes',
    loadListComments: '[publicationActive] loadListComments',
    refreshListComments: '[publicationActive] refreshListComments',
    cleanPublicationActive: '[publicationActive] cleanPublicationActive',
    newComment: '[publicationActive] newComment',
    deleteComment: '[publicationActive] deleteComment',
    follow: '[publicationActive] follow',
    unFollow: '[publicationActive] unFollow',
}


export const publicationActiveReducer = (state = initialState , action) => {

    switch (action.type) {

        case typesPublicationActive.loadListLikes:
            return{
                ...state,
                publicationId: action.payload.publication,
                listLikes: [...state.listLikes, ...action.payload.docs],
                pageLikes: action.payload.nextPage,
                loading: false
            }

        case typesPublicationActive.loadListComments:
            return{
                ...state,
                publicationId: action.payload.publication,
                listComments: [...state.listComments, ...action.payload.docs],
                pageComments: action.payload.nextPage,
                loading: false
            }

        case typesPublicationActive.refreshListComments:
            return{
                ...state,
                listComments: [...action.payload.docs],
                pageComments: action.payload.nextPage,           
            }

        case typesPublicationActive.cleanPublicationActive:
            return{
                ...initialState
            }
        
        case typesPublicationActive.deleteComment:
            return {
                ...state,
                listComments: state.listComments.filter(
                    e => e._id !== action.payload )
            }

        case typesPublicationActive.newComment:
            return {
                ...state,
                listComments: [action.payload.comentario, ...state.listComments],
            }

        case typesPublicationActive.follow:
            return {
                ...state,
                listLikes: state.listLikes.map(
                    e => e.id === action.payload.id ? {...e, siguiendo : true} : e )
            }

        case typesPublicationActive.unFollow:
            return {
                ...state,
                listLikes: state.listLikes.map(
                    e => e.id === action.payload.id ? {...e, siguiendo : false} : e )  
            }  

        default:
            return state;
    }

}

