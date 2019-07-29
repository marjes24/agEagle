import React from "react";
import SideBar from "../sideBar/sideBar";

const WeatherApp: React.FC = () => {
    return (
        <div id="weather-app">
            <SideBar />
            <div id="map-content" />
        </div>
    )
}

export default WeatherApp;