import { SetLocationAction, SET_LOCATION, ClearLocationAction, CLEAR_LOCATION } from "./types";
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