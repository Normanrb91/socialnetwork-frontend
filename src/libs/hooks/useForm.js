import React, {useState} from 'react'

export const useForm = (initialState = {}) => {
    
    const [state, setState] = useState(initialState);

    const onChange = ( value, field ) => {
        setState({
            ...state,
            [field]: value
        });
    }
    
    return {state, onChange}
}
