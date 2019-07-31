import React from "react";
import SideBar from "../sideBar/sideBar";
import WeatherMap from "../map/weatherMap";

const WeatherApp: React.FC = () => {
    return (
        <div id="weather-app">
            <SideBar />
            <WeatherMap />
        </div>
    )
}

export default WeatherApp;