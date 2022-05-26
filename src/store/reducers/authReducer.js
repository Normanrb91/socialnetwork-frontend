const initialState = {
    usuario: null,
    token: null,
    errorMessage: '',
    status: 'cheking'
}

export const typesAuth = {
    singUp: '[auth] singUp',
    addError: '[auth] addError',
    removeError: '[auth] removeError',
    noAuthenticated: '[auth] noAuthenticated',
    logout: '[auth] logout',
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

        default:
            return state;
    }

}

