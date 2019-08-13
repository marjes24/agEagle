import { Coordinate } from "../weather/types";

export type MapRange = { 
    maxLat: number,
    minLat: number, 
    maxLon: number, 
    minLon: number
};

export enum MapMode { 
    NONE = 0, 
    WEATHER,
    RECT
};

export interface MapState {
    selectedLocation: Coordinate | null,
    mode: MapMode,
    selectedRange: null | MapRange
}

export const SET_LOCATION = "SET_LOCATION";
export const CLEAR_LOCATION = "CLEAR_LOCATION";
export const SET_MAP_MODE = "SET_MAP_MODE";
export const SET_RANGE = "SET_RANGE";
export const CLEAR_RANGE = "CLEAR_RANGE";

export interface SetLocationAction { 
    type: typeof SET_LOCATION,
    location: Coordinate
};

export interface ClearLocationAction { 
    type: typeof CLEAR_LOCATION
};

export interface SetMapModeAction { 
    type: typeof SET_MAP_MODE,
    mode: MapMode
};

export interface SetRangeAction { 
    type: typeof SET_RANGE,
    range: MapRange
}

export interface ClearRangeAction { 
    type: typeof CLEAR_RANGE;
}

export type MapActionTypes = 
    SetLocationAction | 
    ClearLocationAction | 
    SetMapModeAction | 
    SetRangeAction |
    ClearRangeAction;