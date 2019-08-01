import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import {
    SET_WEATHER_ERROR,
    SET_WEATHER_DATA,
    SET_WEATHER_LOADING,
    SetErrorAction,
    SetWeatherAction,
    LoadingStateAction,
    WeatherPoint,
    ClearWeatherErrorAction,
    CLEAR_WEATHER_ERROR,
    Coordinate,
    AddWeatherDataAction,
    ADD_WEATHER_DATA
} from "./types";
import { AppState } from "../"
import { setSidebarDisplay } from "../sideBar/action";
import { display } from "../sideBar/types";
import { genCoordStr } from "../../shared/genCoordString";
import { setLocation } from "../map/action";



export const setWeather = (data: WeatherPoint[]): SetWeatherAction => {
    return {
        type: SET_WEATHER_DATA,
        payload: data
    };
};

/**
 * Adds a weather point data instead of replacing all the data
 * @param data 
 */
export const addWeatherData = (data: WeatherPoint[]): AddWeatherDataAction => {
    return { type: ADD_WEATHER_DATA, payload: data };
};

export const setWeatherLoading = (): LoadingStateAction => {
    return {
        type: SET_WEATHER_LOADING
    };
};

export const setErrorAction = (message: string): SetErrorAction => {
    return {
        type: SET_WEATHER_ERROR,
        message
    };
};

export const clearWeatherError = (): ClearWeatherErrorAction => {
    return {
        type: CLEAR_WEATHER_ERROR
    };
};

type ThunkReturn<R> = ThunkAction<R, AppState, void, AnyAction>

export const fetchWeather = (numPoints: number): ThunkReturn<Promise<void>> => {
    return async (dispatch, getState) => {
        try {
            dispatch(setWeatherLoading());
            
            const apiReq = "/weather/data/random?points=" + numPoints;
            const resp = await fetch(apiReq);
            if(resp.ok) {
                const dataPoints: WeatherPoint[] = await resp.json();
                dispatch(setWeather(dataPoints));
                dispatch(setSidebarDisplay(display.WEATHER_COORDS))
            } else {
                throw Error("Error fetching weather data");
            }
        } catch (err) {
            dispatch(setErrorAction(err.message));
        }
    };
};

export const fetchWeatherPoint = (coord: Coordinate ): ThunkReturn<Promise<void>> => {
    return async (dispatch, getState) => {
        try { 
            dispatch(setWeatherLoading());

            let apiReq = "/weather/data/coordinate?";
            apiReq += "lat=" + coord.lat + "&long=" + coord.lon;

            const resp = await fetch(apiReq);
            if(resp.ok) {
                const data: WeatherPoint[] = await resp.json();
                dispatch(addWeatherData(data));
                dispatch(setLocation(coord));
                dispatch(setSidebarDisplay(display.WEATHER));
            } else { 
                throw Error("Error fetching weather data for coordinate: " + genCoordStr(coord));
            }
        } catch(err) {
            dispatch(setErrorAction(err.message));
        }
    }   
}