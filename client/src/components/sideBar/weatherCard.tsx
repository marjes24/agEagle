import React from "react";
import { Coordinate } from "../../store/weather/types";
import { genCoordStr } from "../../shared/genCoordString";


interface WeatherCardProps {
    coord: Coordinate,
    description: string,
    temperature: number,
    humidity: number,
    icon: string,
    pickWeatherCard: (coord: Coordinate) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = props => {
    return (
        <div className="weather-card" onClick={e => props.pickWeatherCard(props.coord)}>
            <h5>Weather</h5>
            <h3>{genCoordStr(props.coord)}</h3>
            <div className="description">
                {props.description}
                <img alt="" src={"http://openweathermap.org/img/wn/" + props.icon + ".png"} >
                    {null}
                </img>
            </div>
            <br /><br />
            <CardValue name={"Temperature"} value={props.temperature} unit={"\u00B0F"} />
            <CardValue name={"Humidity"} value={props.humidity} unit="%" />
        </div>
    );
};


export const CardValue: React.FC<{ name: string, value: number | string, unit?: string }> = props => {
    let { unit } = props;
    if (unit === undefined) unit = "";

    return (
        <div className="data-val">
            <div className="key">{props.name}</div>
            <div className="value">{props.value + " " + unit}</div>
        </div>
    );
};
