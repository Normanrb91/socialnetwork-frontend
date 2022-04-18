import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { publicationReducer } from "./reducers/publicationReducer";


const reducers = combineReducers({
    auth: authReducer,
    publication: publicationReducer

})

export const store = createStore(reducers, applyMiddleware(thunk))


