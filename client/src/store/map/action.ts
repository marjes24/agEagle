import { SetLocationAction, SET_LOCATION } from "./types";
import { Coordinate } from "../weather/types";

export const setLocation = (location: Coordinate): SetLocationAction => {
    return {
        type: SET_LOCATION,
        location
    };
};