import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { publicationsReducer } from "./reducers/publicationsReducer";
import { profileReducer } from "./reducers/profileReducer";


const reducers = combineReducers({
    auth: authReducer,
    publications: publicationsReducer,
    profile: profileReducer

})

export const store = createStore(reducers, applyMiddleware(thunk))


