import React from "react";
import { WeatherPoint, Coordinate } from "../../store/weather/types";
import { WeatherCard } from "./weatherCard";

interface Props {
    data: WeatherPoint[],
    pickWeatherCard: (coord: Coordinate) => void
}

const WeatherCardList: React.FC<Props> = props => {
    const extractData = (wP: WeatherPoint) => {
        return {
            coord: wP.coord,
            description: wP.weather[0].description,
            temperature: wP.main.temp,
            humidity: wP.main.humidity,
            pickWeatherCard: props.pickWeatherCard
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

export default WeatherCardList;