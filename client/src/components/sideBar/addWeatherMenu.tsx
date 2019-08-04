import React, { useState } from "react";
import { allDigits } from "../../shared/allDigits";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherPoint } from "../../store/weather/actions";
import { ErrorMessage, Loading } from "./requestMenu";
import { AppState } from "../../store";
import { loadState as LoadingStates } from "../../store/weather/types";

const validInput = (s: string) => {
    // Check if empty or if negative
    const firstChar = s.charAt(0);
    if (firstChar == "")
        return true;
    if (allDigits(firstChar) === false && firstChar !== "-")
        return false;

    return allDigits(s.substr(1));
}

const AddWeatherMenu: React.FC = props => {
    const dispatch = useDispatch();
    const { loadState, error: errMessage } = useSelector((state: AppState) => state.weatherReducer);
    const [coord, setOptions] = useState({
        lon: "",
        lat: ""
    });

    const setLon = (s: string) => {
        if (validInput(s)) setOptions({ ...coord, lon: s });
    }

    const setLat = (s: string) => {
        if (validInput(s)) setOptions({ ...coord, lat: s });
    }

    const addPoint = () => {
        const { lat, lon } = coord;

        if (isNaN(parseInt(lat)) || isNaN(parseInt(lon)))
            return;

        dispatch(fetchWeatherPoint({
            lat: parseInt(coord.lat),
            lon: parseInt(coord.lon)
        }));
    }

    if (loadState === LoadingStates.LOADING) {
        return (
            <div id="add-weather-menu" className="menu-wrapper">
                <Loading />
            </div>
        )
    }

    if (loadState === LoadingStates.ERROR) {
        return (
            <div id="add-weather-menu" className="menu-wrapper">
                <ErrorMessage message={errMessage || "" }/>
            </div>
        );
    };

    return (
        <div id="add-weather-menu" className="menu-wrapper">
            <div className="menu-title">Add weather coordinate</div>
            <input
                type="text"
                placeholder="Enter latitude"
                value={coord.lat}
                onChange={e => { setLat(e.target.value) }}
            />
            <input
                type="text"
                placeholder="Enter longitude"
                value={coord.lon}
                onChange={e => { setLon(e.target.value) }}
            />
            <div className="button-wrapper">
                <button
                    className="btn-submit"
                    onClick={e => addPoint()}
                >
                    Add
                </button>
                <button
                    className="btn-cancel"
                    onClick={e => {
                        setOptions({ lat: "", lon: "" });
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}

export default AddWeatherMenu;