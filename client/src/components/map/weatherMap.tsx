import React from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import "./map.scss";
import FeatureLayer from "./featureLayer";


const WeatherMap: React.FC = () => {
    const Map = ReactMapboxGl({
        accessToken:
            ""
    });
    return (
        <div id="map-content">
            <Map
                style="mapbox://styles/mapbox/light-v9"
                containerStyle={{
                    height: '100%',
                    width: '100%'
                }}
                center={[-0.481747846041145, 51.3233379650232]}
                zoom={[1]}
                onStyleLoad={map => {console.log(map.listImages())}}
            >
                <FeatureLayer />
            </Map>;
        </div>
    )
}

export default WeatherMap;