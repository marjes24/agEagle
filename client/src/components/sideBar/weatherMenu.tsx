import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { WeatherState } from "../../store/weather/types";
import WeatherCardList from "./weatherCardList";
import { AppState } from "../../store";
import "./weatherMenu.scss";

const WeatherMenu: React.FC = props => {
    const dispatch = useDispatch<Dispatch<AnyAction>>();
    const { data } = useSelector<AppState, WeatherState>(state => state.weatherReducer)

    return (
        <div id="weather-menu" className="menu-wrapper">
            <div className="list-wrapper">
                <WeatherCardList data={data} />
            </div>
        </div>
    );
}


export default WeatherMenu;