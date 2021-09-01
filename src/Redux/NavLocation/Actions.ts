import { SET_LOCATION } from "./Constants";

export const setLocation = (location: NavLocation) => ({
    type: SET_LOCATION,
    payload: location,
})