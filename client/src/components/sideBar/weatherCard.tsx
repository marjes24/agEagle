import React from "react";
import { WeatherPoint, Coordinate } from "../../store/weather/types";


interface WeatherCardProps {
    coord: Coordinate,
    description: string,
    temperature: number,
    humidity: number
    pickWeatherCard: (coord: Coordinate) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = props => {
    return (
        <div className="weather-card" onClick={e => props.pickWeatherCard(props.coord)}>
            <h5>Weather</h5>
            <h3>{generateLocation(props.coord)}</h3>
            <div className="description">{props.description}</div>
            <br /><br />
            <CardValue name={"Temperature"} value={props.temperature} unit={"\u00B0F"} />
            <CardValue name={"Humidity"} value={props.humidity} unit="%" />
        </div>
    );
};

// Generate a location string
export const generateLocation = (coords: Coordinate) => {
    const { lat, lon } = coords;
    let locStr = "";
    locStr +=
        Math.abs(lat) +
        "\u00B0" +
        (lat < 0 ? "S" : "N") +
        " " +
        Math.abs(lon) +
        "\u00B0" +
        (lon < 0 ? "E" : "W");
    return locStr;
};

export const CardValue: React.FC<{ name: string, value: number | string, unit?: string }> = props => {
    let { unit } = props;
    if (unit == undefined) unit = "";

    return (
        <div className="data-val">
            <div className="key">{props.name}</div>
            <div className="value">{props.value + " " + unit}</div>
        </div>
    );
};
