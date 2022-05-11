import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { profileOtherReducer } from "./reducers/profileOtherReducer";

const reducers = combineReducers({
    auth: authReducer,
    profileOther: profileOtherReducer
})

export const store = createStore(
    reducers, 
    applyMiddleware(thunk)
);


