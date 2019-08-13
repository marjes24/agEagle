import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { loadState as LoadingStates } from "../../store/weather/types";
import { AppState } from "../../store";
import { fetchWeather, clearWeatherError } from "../../store/weather/actions";
import { allDigits } from "../../shared/allDigits";
import RangeOption from "./rangeOption";
import { setMapMode } from "../../store/map/action";
import { MapMode } from "../../store/map/types";

const RequestMenu: React.FC = props => {
    // Get necessary redux state and action dispatching
    const { loadState, error: errorMssg } = useSelector((state: AppState) => state.weatherReducer);
    const { selectedRange } = useSelector((state: AppState) => state.MapReducer);
    const dispatch = useDispatch<ThunkDispatch<AppState, void, AnyAction>>();

    // If error, clear after 5 seconds
    useEffect(() => {
        if (loadState === LoadingStates.ERROR) {
            setTimeout(() => {
                dispatch(clearWeatherError());
            }, 5000);
        }
    }, [loadState]);

    // Set component state
    const [pointInput, setPointInput] = useState("");

    // Clear Component state 
    const clearInput = () => {
        setPointInput("");
    };

    const clearMap = () => {
        dispatch(setMapMode(MapMode.NONE));
        setTimeout(() => {
            dispatch(setMapMode(MapMode.RECT));
        }, 500)
    };

    const clear = () => { 
        clearInput();
        clearMap();
    };

    const requestWeather = () => {
        if (pointInput == "") { }
        const points = parseInt(pointInput);
        if(selectedRange) {
            const { 
                minLat,
                maxLat, 
                minLon, 
                maxLon
            } = selectedRange;
            dispatch(fetchWeather(points, minLat, maxLat, minLon, maxLon));
        } else {
            dispatch(fetchWeather(points));
        }
    };

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
                <ErrorMessage message={errorMssg || ""} />
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
                value={pointInput}
                onChange={e => {
                    const { value } = e.target;
                    if (value === "" || allDigits(value))
                        setPointInput(value);
                }}
            />
            <br /><br />
            <RangeOption />
            <div className="button-wrapper">
                <button
                    className="btn-submit"
                    onClick={e => requestWeather()}
                >
                    Request
                </button>
                <button
                    className="btn-cancel"
                    onClick={e => clear()}
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

export const ErrorMessage: React.FC<{ message: string }> = props => {
    return (
        <div className="loading-mssg">
            <h1>
                Error loading weather data..
            </h1>
            <div className="mssg">{props.message}</div>
        </div>
    );
}



export default RequestMenu;