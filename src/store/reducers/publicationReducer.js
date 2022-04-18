
const initialState = {
    publications : [],
    nextPage: 1,
}

export const types = {
    loadPublications: '[publication] loadPublications',
    refreshPublication: '[publication] refreshPublication',
    cleanPublications: '[publication] cleanPublications'
}

export const publicationReducer = (state = initialState , action) => {

    switch (action.type) {

        case types.cleanPublications:
            return {
                ...state,
                publications: [],
                nextPage: 1
            }

        case types.loadPublications:
            return {
                ...state,
                publications: [...state.publications, ...action.payload.docs],
                nextPage: action.payload.nextPage
            }

        case types.refreshPublication:
            return {
                ...state,
                publications: [...action.payload.docs],
                nextPage: 1
            }
        default:
            return state;
    }

}
