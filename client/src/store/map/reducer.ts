import {
    MapState,
    MapActionTypes,
    SET_LOCATION,
    CLEAR_LOCATION
} from "./types";

const initialState: MapState = {
    selectedLocation: null
};

export const MapReducer = (
    state = initialState,
    action: MapActionTypes
): MapState => {
    switch (action.type) {
        case SET_LOCATION:
            return { ...state, selectedLocation: action.location };
        case CLEAR_LOCATION: 
            return {...state, selectedLocation: null }
        default:
            return state;
    }
}