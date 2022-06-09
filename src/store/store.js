import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { homeReducer } from "./reducers/homeReducer";
import { profileOtherReducer } from "./reducers/profileOtherReducer";
import { profileReducer } from "./reducers/profileReducer";
import { publicationActiveReducer } from "./reducers/publicationActiveReducer";
import { searchReducer } from "./reducers/searchReducer";

const reducers = combineReducers({
    auth: authReducer,
    home: homeReducer,
    profile: profileReducer,
    profileOther: profileOtherReducer,
    search: searchReducer,
    publicationActive: publicationActiveReducer
})

export const store = createStore(
    reducers, 
    applyMiddleware(thunk)
);


