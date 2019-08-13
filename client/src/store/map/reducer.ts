import {
    MapState,
    MapActionTypes,
    SET_LOCATION,
    CLEAR_LOCATION,
    SET_MAP_MODE,
    SET_RANGE,
    MapMode,
    CLEAR_RANGE,
    ADD_POINT,
    CLEAR_POINT
} from "./types";

const initialState: MapState = {
    selectedLocation: null,
    mode: MapMode.NONE,
    selectedRange: null,
    selectedPointToAdd: null
};

export const MapReducer = (
    state = initialState,
    action: MapActionTypes
): MapState => {
    switch (action.type) {
        case SET_LOCATION:
            return { ...state, selectedLocation: action.location };
        case CLEAR_LOCATION:
            return { ...state, selectedLocation: null };
        case SET_MAP_MODE:
            return { ...state, mode: action.mode };
        case SET_RANGE:
            return {
                ...state,
                selectedRange: {
                    ...action.range
                }
            };
        case CLEAR_RANGE:
            return {
                ...state,
                selectedRange: null
            };
        case ADD_POINT: 
            return {
                ...state, 
                selectedPointToAdd: action.coord
            };
        case CLEAR_POINT: 
            return {
                ...state, 
                selectedPointToAdd: null
            };
        default:
            return state;
    }
}