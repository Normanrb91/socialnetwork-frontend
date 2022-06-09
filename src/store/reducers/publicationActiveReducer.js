const initialState = {
    publicationId: undefined,
    listLikes: [],
    listComments: [],
    pageLikes: undefined,
    pageComments: undefined,
    loadingLike: true,
    loadingComment: true
}

export const typesPublicationActive = {
    loadListLikes: '[publicationActive] loadListLikes',
    loadListComments: '[publicationActive] loadListComments',
    refreshListComments: '[publicationActive] refreshListComments',
    cleanPublicationActive: '[publicationActive] cleanPublicationActive',
    newComment: '[publicationActive] newComment',
    deleteComment: '[publicationActive] deleteComment',
}


export const publicationActiveReducer = (state = initialState , action) => {

    switch (action.type) {

        case typesPublicationActive.loadListLikes:
            return{
                ...state,
                publicationId: action.payload.publication,
                listLikes: [...state.listLikes, ...action.payload.usuarios.docs],
                pageLikes: action.payload.usuarios.nextPage,
                loadingLike: false
            }

        case typesPublicationActive.loadListComments:
            return{
                ...state,
                publicationId: action.payload.publication,
                listComments: [...state.listComments, ...action.payload.comentarios.docs],
                pageComments: action.payload.comentarios.nextPage,
                loadingComment: false
            }

        case typesPublicationActive.refreshListComments:
            return{
                ...state,
                listComments: [...action.payload.comentarios.docs],
                pageComments: action.payload.comentarios.nextPage,           
            }

        case typesPublicationActive.cleanPublicationActive:
            return{
                ...initialState
            }
        
        case typesPublicationActive.deleteComment:
            return {
                ...state,
                listComments: state.listComments.filter(
                    e => e._id !== action.payload.id )
            }

        case typesPublicationActive.newComment:
            return {
                ...state,
                listComments: [action.payload.comentario, ...state.listComments],
            }

        default:
            return state;
    }

}

