import React, { FC } from "react";
import { display } from "../../store/sideBar/types";
import RequestMenu from "./requestMenu";
import WeatherMenu from "./weatherMenu";
import WeatherData from "./weatherData";
import AddWeatherMenu from "./addWeatherMenu";

interface Props {
    display: display;
    setDisplay: (d: display) => void;
}

const MarginContent: FC<Props> = props => {
    return (
        <div id="margin-content">
            {props.display === display.WEATHER_REQUEST && <RequestMenu />}
            {props.display === display.WEATHER_COORDS && <WeatherMenu />}
            {props.display === display.WEATHER && <WeatherData />}
            {props.display === display.ADD_COORD && <AddWeatherMenu />}
        </div>
    );
}

export default MarginContent;