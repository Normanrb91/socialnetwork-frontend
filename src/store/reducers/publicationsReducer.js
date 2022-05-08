
const initialState = {
    publications : [],
    nextPage: 1,
    loading: true
}

export const types = {
    loadPublications: '[publications] loadPublications',
    refreshPublications: '[publications] refreshPublication',
    cleanPublications: '[publications] cleanPublications',
}

export const publicationsReducer = (state = initialState , action) => {

    switch (action.type) {

        case types.cleanPublications:
            return {
                ...state,
                publications: [],
                nextPage: 1,
                loading: false
            }

        case types.loadPublications:
            return {
                ...state,
                publications: [...state.publications, ...action.payload.docs],
                nextPage: action.payload.nextPage,
                loading: false
            }

        case types.refreshPublications:
            return {
                ...state,
                publications: [...action.payload.docs],
                nextPage: action.payload.nextPage,
                loading: false
            }

        default:
            return state;
    }

}
