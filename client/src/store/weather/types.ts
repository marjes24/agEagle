export enum loadState {
    INIT = 0,
    LOADING,
    LOADED,
    ERROR
};

export type Coordinate = { lon: number, lat: number }

export interface WeatherPoint {
    coord: Coordinate,
    weather: {id: number, main: string, description: string, icon: string}[],
    base: string,
    main: {
        temp: number, 
        pressure: number, 
        humidity: number,
        temp_min: number, 
        temp_max: number
    }
    visibility: number,
    wind: { speed: number, deg: number },
    clouds: { all: number },
    rain?: { "1h": number, "3h": number },
    snow?: { "1h": number, "3h": number },
    dt: number, //Time of data calculating
    sys: { 
        type: number, 
        id: number,
        message: number,
        country: string,
        sunrise: number, 
        sunset: number
    }, 
    timezone: number, 
    id: number, 
    name: string, 
    cod: number
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