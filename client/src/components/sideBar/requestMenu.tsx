import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { WeatherState, loadState as LoadingStates } from "../../store/weather/types";
import { AppState } from "../../store";
import { fetchWeather, clearWeatherError } from "../../store/weather/actions";
import { allDigits } from "../../shared/allDigits";

const RequestMenu: React.FC = props => {
    // Get necessary redux state and action dispatching
    const { loadState } = useSelector<AppState, WeatherState>(state => state.weatherReducer);
    const dispatch = useDispatch<ThunkDispatch<AppState, void, AnyAction>>();
    const requestWeather = (numPoints: number) => dispatch(fetchWeather(numPoints));
    
    // If error, clear after 5 seconds
    useEffect(() => {
        if (loadState === LoadingStates.ERROR) {
            setTimeout(() => {
                dispatch(clearWeatherError());
            }, 5000);
        }
    }, [loadState]);

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

    if (loadState === LoadingStates.ERROR) {
        return (
            <div id="request-menu" className="menu-wrapper">
                <ErrorMessage />
            </div>
        );
    };

    return (
        <div id="request-menu" className="menu-wrapper">
            <div className="menu-title">Request weather data</div>
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

export const Loading: React.FC = props => {
    return (
        <div className="loading-mssg">
            <h1>Loading weather data...</h1>
        </div>
    );
}

export const ErrorMessage: React.FC = props => {
    return (
        <div className="loading-mssg">
            <h1>Error loading weather data..</h1>
        </div>
    );
}



export default RequestMenu;