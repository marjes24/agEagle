import {
    MapState,
    MapActionTypes,
    SET_LOCATION,
    CLEAR_LOCATION,
    DrawMode,
    SET_DRAW_MODE,
    SET_RANGE
} from "./types";

const initialState: MapState = {
    selectedLocation: null,
    drawMode: DrawMode.RECT, 
    selectedRange: null
};

export const MapReducer = (
    state = initialState,
    action: MapActionTypes
): MapState => {
    switch (action.type) {
        case SET_LOCATION:
            return { ...state, selectedLocation: action.location };
        case CLEAR_LOCATION: 
            return {...state, selectedLocation: null };
        case SET_DRAW_MODE: 
            return {...state, drawMode: action.mode};
        case SET_RANGE: 
            return {
                ...state, 
                selectedRange: {
                    ...action.range
                }
            };
        default:
            return state;
    }
}