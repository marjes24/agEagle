import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { WeatherState, loadState as LoadingStates } from "../../store/weather/types";
import { AppState } from "../../store";
import { fetchWeather } from "../../store/weather/actions";

// validate a string is all digits
const allDigits = (s: string) => {
    for (let char of s) {
        if (isNaN(parseInt(char))) return false;
    }
    return true;
}

const RequestMenu: React.FC = props => {
    // Get necessary redux state and action dispatching
    const { loadState } = useSelector<AppState, WeatherState>(state => state.weatherReducer);
    const dispatch = useDispatch<ThunkDispatch<AppState, void, AnyAction>>();

    const requestWeather = (numPoints: number) => dispatch(fetchWeather(numPoints));

    // Set component state
    const [optionState, setOptions] = useState({
        pointInput: ""
    });

    if (loadState === LoadingStates.LOADING) {
        return (
            <div id="request-menu" className="menu-wrapper">
                <Loading />
            </div>
        )
    }

    return (
        <div id="request-menu" className="menu-wrapper">
            <input
                id="point-input"
                type="text"
                placeholder="Enter number of coordinates"
                value={optionState.pointInput}
                onChange={e => {
                    const { value } = e.target;
                    if (value === "" || allDigits(value))
                        setOptions({ ...optionState, pointInput: value });
                }}
            />
            <div className="button-wrapper">
                <button
                    className="btn-submit"
                    onClick={e => {
                        requestWeather(parseInt(optionState.pointInput));
                    }}
                >
                    Request
                </button>
                <button
                    className="btn-cancel"
                    onClick={e => {
                        setOptions({ pointInput: "" });
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

const Loading: React.FC = props => {
    return (
        <div className="loading-mssg">
            <h1>Loading weather data...</h1>
        </div>
    );
}

export default RequestMenu;