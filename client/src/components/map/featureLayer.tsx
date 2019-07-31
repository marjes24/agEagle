import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layer, Feature, Marker } from "react-mapbox-gl";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppState } from "../../store/";
import { WeatherState, Coordinate } from "../../store/weather/types";
import { setLocation } from "../../store/map/action";
import { setSidebarDisplay } from "../../store/sideBar/action";
import { display } from "../../store/sideBar/types";
import { MapState } from "../../store/map/types";

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
                data.map(wP => {
                    
                    return <Marker
                        coordinates={[wP.coord.lon, wP.coord.lat]}
                        onClick={e => pickCoord(wP.coord)}
                    >
                        <FontAwesomeIcon
                            icon={faCloud}
                            size="3x"
                            className={ "map-marker" + (isSelected(wP.coord) ? " selected" : "")}
                        />
                    </Marker>
                })
            }
        </>
    );
};

export default FeatureLayer;