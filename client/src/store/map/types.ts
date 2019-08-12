import { Coordinate } from "../weather/types";

export type MapRange = { 
    maxLat: number,
    minlat: number, 
    maxLon: number, 
    minLon: number
};

export enum DrawMode { 
    NONE = 0, 
    RECT
};

export interface MapState {
    selectedLocation: Coordinate | null,
    drawMode: DrawMode,
    selectedRange: null | MapRange
}

export const SET_LOCATION = "SET_LOCATION";
export const CLEAR_LOCATION = "CLEAR_LOCATION";
export const SET_DRAW_MODE = "SET_DRAW_MODE";
export const SET_RANGE = "SET_RANGE";

export interface SetLocationAction { 
    type: typeof SET_LOCATION,
    location: Coordinate
};

export interface ClearLocationAction { 
    type: typeof CLEAR_LOCATION
};

export interface SetDrawModeAction { 
    type: typeof SET_DRAW_MODE,
    mode: DrawMode
};

export interface SetRangeAction { 
    type: typeof SET_RANGE,
    range: MapRange
}

export type MapActionTypes = SetLocationAction | ClearLocationAction | SetDrawModeAction | SetRangeAction;