import { 
    SetLocationAction, 
    SET_LOCATION, 
    ClearLocationAction, 
    CLEAR_LOCATION, 
    SetRangeAction, 
    SET_RANGE , 
    MapRange,
    DrawMode,
    SetDrawModeAction,
    SET_DRAW_MODE
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

export const setRange = (range: MapRange ): SetRangeAction => {
    return { 
        type: SET_RANGE, 
        range
    };
};

export const setDrawMode = (mode: DrawMode): SetDrawModeAction => {
    return {
        type: SET_DRAW_MODE, 
        mode
    };
};