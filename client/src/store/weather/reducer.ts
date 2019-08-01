import {
    WeatherState,
    WeatherActionTypes,
    loadState,
    SET_WEATHER_ERROR,
    SET_WEATHER_DATA,
    SET_WEATHER_LOADING,
    CLEAR_WEATHER_ERROR
} from "./types";

const initialState: WeatherState = {
    data: [],
    loadState: loadState.INIT,
    error: null
}

export const weatherReducer = (
    state = initialState,
    action: WeatherActionTypes
): WeatherState => {
    switch (action.type) {
        case SET_WEATHER_DATA:
            return {
                ...state,
                data: action.payload,
                loadState: loadState.LOADED
            };
        case SET_WEATHER_ERROR:
            return {
                ...state,
                loadState: loadState.ERROR,
                error: action.message
            };
        case SET_WEATHER_LOADING:
            return {
                ...state,
                loadState: loadState.LOADING,
            };
        case CLEAR_WEATHER_ERROR: 
            return {
                ...state, 
                loadState: loadState.INIT
            }
        default:
            return state;
    };
};