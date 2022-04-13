
const initialState = {
    usuario: null,
    token: null,
    errorMessage: '',
    status: 'cheking'
}

export const types = {
    singUp: '[auth] singUp',
    addError: '[auth] addError',
    removeError: '[auth] removeError',
    noAuthenticated: '[auth] noAuthenticated',
    logout: '[auth] logout',
}


export const authReducer = (state = initialState , action) => {

    switch (action.type) {
        case types.addError:
            return {
                ...state,
                errorMessage: action.payload,
                usuario: null,
                token: null,
                status: 'noAuthenticated'
            }

        case types.removeError:
            return {
                ...state,
                errorMessage: '',
            }

        case types.singUp:
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                usuario: action.payload.usuario
            }

        case types.noAuthenticated:
        case types.logout:
            return {
                ...state,
                status: 'noAuthenticated',
                token: null,
                usuario: null
            }

        default:
            return state;
    }

}

