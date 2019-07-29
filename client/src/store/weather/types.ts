export enum loadState {
    INIT = 0,
    LOADING,
    LOADED,
    ERROR
};

export interface WeatherPoint {
    [key: string]: string | number;
};

export interface WeatherState {
    data: WeatherPoint[],
    loadState: loadState,
    error: string | null
};

export const SET_WEATHER_ERROR   = "SET_WEATHER_ERROR";
export const SET_WEATHER_DATA    = "SET_WEATHER_DATA";
export const SET_WEATHER_LOADING = "SET_WEATHER_LOADING";

export interface SetErrorAction {
    type: typeof SET_WEATHER_ERROR,
    message: string
}

export interface SetWeatherAction {
    type: typeof SET_WEATHER_DATA,
    payload: WeatherPoint[]
}

export interface LoadingStateAction {
    type: typeof SET_WEATHER_LOADING
}

export type WeatherActionTypes =
    SetErrorAction |
    SetWeatherAction |
    LoadingStateAction;