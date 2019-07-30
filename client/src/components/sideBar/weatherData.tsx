import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { generateLocation, CardValue } from "./weatherCard";
import { WeatherPoint, WeatherState, Coordinate } from "../../store/weather/types";
import { MapState } from "../../store/map/types";



const WeatherData: React.FC = props => {
    const { data } = useSelector<AppState, WeatherState>(state => state.weatherReducer);
    const { selectedLocation: coord } = useSelector<AppState, MapState>(state => state.MapReducer);

    if(coord === null) return <div></div>;

    // Search data for selected location
    let  wP: WeatherPoint | null = null;
    for(let p of data) {
        if(p.coord.lat == coord.lat && p.coord.lon == coord.lon){
            wP = p;
            break;
        }
    }

    // If point was not found
    if(!wP) return <div></div>
    
    return (
        <div id="weather-menu" className="menu-wrapper">
            <div className="data-card-expanded">
                <h5>Weather</h5>
                <h3>{generateLocation(wP.coord)}</h3>
                <div className="description">{wP.weather[0].description}</div>
                <br /><br />
                <h5>Temperature</h5>
                <CardValue name={"Temperature"} value={wP.main.temp} unit={"\u00B0F"} />
                <CardValue name={"Min Temperature"} value={wP.main.temp_max} unit={"\u00B0F"} />
                <CardValue name={"Max Temperature"} value={wP.main.temp_min} unit={"\u00B0F"} />
                <br/>
                <h5>Humidity and Pressure</h5>
                <CardValue name={"Humidity"} value={wP.main.humidity} unit="%" />
                <CardValue name={"Pressure"} value={wP.main.pressure} unit={"hPa"} />
                <br/>
                <h5>Wind</h5>
                <CardValue name={"Wind Speed"} value={wP.wind.speed} unit={"mph"} />
                <CardValue name={"Wind Direction"} value={wP.wind.deg} unit={"\u00B0"} />
                <h5>Clouds</h5>
                <CardValue name={"clouds"} value={wP.clouds.all} unit={"%"} />
                <br/>
                {
                    wP.rain !== undefined &&
                        <>
                            <h5>Rain</h5>
                            <CardValue name={"Las hour"} value={wP.rain["1h"]} unit={"\u00B0"} />
                            <CardValue name={"Last three hours"} value={wP.rain["3h"]} unit={"mm"} />
                            <br/>
                        </> 
                }
                {
                    wP.snow !== undefined &&
                        <>
                            <h5>Snow</h5>
                            <CardValue name={"Las hour"} value={wP.snow["1h"]} unit={"\u00B0"} />
                            <CardValue name={"Last three hours"} value={wP.snow["3h"]} unit={"mm"} />
                            <br/>
                        </> 
                }
            </div>
        </div>
    );
}

export default WeatherData;