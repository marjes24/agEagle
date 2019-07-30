import { Coordinate } from "../weather/types";

export interface MapState {
    selectedLocation: Coordinate | null
}

export const SET_LOCATION = "SET_LOCATION";

export interface SetLocationAction { 
    type: typeof SET_LOCATION,
    location: Coordinate
};

export type MapActionTypes = SetLocationAction;