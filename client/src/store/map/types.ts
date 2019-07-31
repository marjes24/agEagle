import { Coordinate } from "../weather/types";

export interface MapState {
    selectedLocation: Coordinate | null
}

export const SET_LOCATION = "SET_LOCATION";
export const CLEAR_LOCATION = "CLEAR_LOCATION";

export interface SetLocationAction { 
    type: typeof SET_LOCATION,
    location: Coordinate
};

export interface ClearLocationAction { 
    type: typeof CLEAR_LOCATION
};

export type MapActionTypes = SetLocationAction | ClearLocationAction;