import React from "react";
import { WeatherPoint, Coordinate } from "../../store/weather/types";

const WeatherCardList: React.FC<{ data: WeatherPoint[] }> = props => {
    const extractData = (wP: WeatherPoint) => {
        return {
            coord: wP.coord,
            description: wP.weather[0].description,
            temperature: wP.main.temp,
            humidity: wP.main.humidity
        };
    };

    return (
        <div className="list">
            {
                props.data.map((wp, idx) => {
                    return <WeatherCard {...extractData(wp)} />
                })
            }
        </div>
    );
};

interface WeatherCardProps {
    coord: Coordinate,
    description: string,
    temperature: number,
    humidity: number

}


const WeatherCard: React.FC<WeatherCardProps> = props => {
    // Generate a location string
    const generateLocation = (coords: Coordinate) => {
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

    return (
        <div className="weather-card">
            <h5>Weather</h5>
            <h3>{generateLocation(props.coord)}</h3>
            <div className="description">{props.description}</div>
            <br/><br/>
            <CardValue name={"Temperature"} value={props.temperature}/>
            <CardValue name={"Humidity"} value={props.humidity} unit="%"/>
        </div>
    );
};

const CardValue: React.FC<{name: string, value: number | string, unit?: string}> = props => {
    let { unit } = props;
    if(unit == undefined) unit = "";
    
    return (
        <div className="data-val">
            <div className="key">{props.name}</div>
            <div className="value">{props.value + " " + unit}</div>
        </div>
    );
};

export default WeatherCardList;