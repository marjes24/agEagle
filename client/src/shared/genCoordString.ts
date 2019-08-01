import { Coordinate } from "../store/weather/types";

/**
 * Generates a display string from coordinates
 * @param coords 
 */
export const genCoordStr = (coords: Coordinate) => {
    const { lat, lon } = coords;
    let locStr = "";
    locStr +=
        Math.abs(lat) +
        "\u00B0" +
        (lat < 0 ? "S" : "N") +
        " " +
        Math.abs(lon) +
        "\u00B0" +
        (lon < 0 ? "W" : "E");
    return locStr;
};