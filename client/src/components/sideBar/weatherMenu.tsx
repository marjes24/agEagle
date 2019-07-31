import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { WeatherState, Coordinate } from "../../store/weather/types";
import { setLocation } from "../../store/map/action";
import WeatherCardList from "./weatherCardList";
import { AppState } from "../../store";
import { setSidebarDisplay } from "../../store/sideBar/action";
import { display } from "../../store/sideBar/types";
import "./weatherMenu.scss";

const WeatherMenu: React.FC = props => {
    const dispatch = useDispatch<Dispatch<AnyAction>>();
    const { data } = useSelector<AppState, WeatherState>(state => state.weatherReducer);

    const pickWeatherCard = (coord: Coordinate) => {
        dispatch(setLocation(coord));
        dispatch(setSidebarDisplay(display.WEATHER));
    }

    if(data.length === 0) {
        return (
            <div id="weather-menu" className="menu-wrapper">
                <div className="data-warning">
                    No weather data has been loaded...
                </div>
            </div>
        );
    }

    return (
        <div id="weather-menu" className="menu-wrapper">
            <div className="menu-title">Quick View</div>
            <div className="list-wrapper">
                <WeatherCardList data={data} pickWeatherCard={pickWeatherCard} />
            </div>
        </div>
    );
}


export default WeatherMenu;