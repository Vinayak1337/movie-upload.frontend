import { combineReducers } from "redux"
import { locationReducer } from "./NavLocation/Reducer"

const rootReducer = combineReducers({
    locationReducer,
})

export default rootReducer