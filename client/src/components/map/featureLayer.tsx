import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Marker } from "react-mapbox-gl";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

import { AppState } from "../../store/";
import { WeatherState, Coordinate } from "../../store/weather/types";
import { setLocation } from "../../store/map/action";
import { setSidebarDisplay } from "../../store/sideBar/action";
import { display } from "../../store/sideBar/types";
import { MapState } from "../../store/map/types";
import { genCoordStr } from "../../shared/genCoordString";

const FeatureLayer: React.FC = props => {
    const { data } = useSelector<AppState, WeatherState>(state => state.weatherReducer);
    const { selectedLocation } = useSelector<AppState, MapState>(state => state.MapReducer);
    const dispatch = useDispatch();

    const isSelected = (c: Coordinate) => {
        if(selectedLocation)
            return c.lat === selectedLocation.lat && c.lon === selectedLocation.lon;
        return false;
    }

    const pickCoord = (coord: Coordinate) => {
        dispatch(setLocation(coord));
        dispatch(setSidebarDisplay(display.WEATHER));
    }


    return (
        <>
            {
                data.map((wP,idx) => {
                    
                    return <Marker
                        coordinates={[wP.coord.lon, wP.coord.lat]}
                        onClick={e => pickCoord(wP.coord)}
                        key={"mrkr-" + idx}
                    >
                        <a 
                            data-for={"mrkr-" + idx}
                            className="map-anchor" 
                            data-tip={genCoordStr(wP.coord)}
                        >
                            <FontAwesomeIcon
                                icon={faCloud}
                                size="3x"
                                className={ "map-marker" + (isSelected(wP.coord) ? " selected" : "")}
                            />
                             <ReactTooltip id={"mrkr-" + idx} place="top" multiline={false}/>
                        </a>
                       
                    </Marker>
                })
            }
        </>
    );
};

export default FeatureLayer;