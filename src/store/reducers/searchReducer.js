const initialState = {
    users: [],
    loading: false,
    page: undefined
}

export const typeSearch = {
    starSearch: '[search] starSearch',
    searchSuccess: '[search] searchSuccess',
    searchError: '[search] searchError',
    cleanSearch: '[search] cleanSearch',
}


export const searchReducer = (state = initialState , action) => {

    switch (action.type) {
        
        case typeSearch.starSearch:
            return {
                ...state,
                loading: true
            }

        case typeSearch.searchSuccess:
            return {
                ...state,
                loading: false,
                users: action.payload.docs
            }
        
        case typeSearch.searchError:
            return {
                ...state,
                loading: false,
            }

        case typeSearch.cleanSearch:
            return {
                ...initialState,
            }

        case typeSearch.laodSearchUser:
            return {
                ...state,
                users: [...state.users, action.payload.docs],
                page: action.payload.nextPage,
            }

        default:
            return state;
    }

}

