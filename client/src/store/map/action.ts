import {
    SetLocationAction,
    SET_LOCATION,
    ClearLocationAction,
    CLEAR_LOCATION,
    SetRangeAction,
    SET_RANGE,
    MapRange,
    MapMode,
    SetMapModeAction,
    SET_MAP_MODE,
    ClearRangeAction,
    CLEAR_RANGE,
    AddPointAction,
    ADD_POINT,
    ClearPointAction,
    CLEAR_POINT
} from "./types";
import { Coordinate } from "../weather/types";

export const setLocation = (location: Coordinate): SetLocationAction => {
    return {
        type: SET_LOCATION,
        location
    };
};

export const clearLocation = (): ClearLocationAction => {
    return {
        type: CLEAR_LOCATION
    };
};

export const setRange = (range: MapRange): SetRangeAction => {
    return {
        type: SET_RANGE,
        range
    };
};

export const clearRange = (): ClearRangeAction => {
    return { type: CLEAR_RANGE };
};

export const setMapMode = (mode: MapMode): SetMapModeAction => {
    return {
        type: SET_MAP_MODE,
        mode
    };
};

export const addPoint = (coord: Coordinate): AddPointAction => {
    return {
        type: ADD_POINT,
        coord
    };
};

export const clearPoint = (): ClearPointAction => { 
    return { type: CLEAR_POINT };
}