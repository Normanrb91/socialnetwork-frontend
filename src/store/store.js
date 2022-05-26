import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { homeReducer } from "./reducers/homeReducer";
import { profileOtherReducer } from "./reducers/profileOtherReducer";
import { profileReducer } from "./reducers/profileReducer";

const reducers = combineReducers({
    auth: authReducer,
    home: homeReducer,
    profile: profileReducer,
    profileOther: profileOtherReducer
})

export const store = createStore(
    reducers, 
    applyMiddleware(thunk)
);


