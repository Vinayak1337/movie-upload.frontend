import { INITIAL_LOCATION, SET_LOCATION } from "./Constants";

export const locationReducer = (state = INITIAL_LOCATION, action: LocationReducerAction) => {
    switch (action.type) {
        case SET_LOCATION:
            return { ...state, navLocation: action.payload }

        default: return state
    }
}