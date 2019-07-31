import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import "./map.scss";
import FeatureLayer from "./featureLayer";

const WeatherMap: React.FC = () => {
    const [token, setToken] = useState("");

    //Request the token to render map
    useEffect(() => {
        const fetchToken = async () => {
            const resp = await fetch("/key/mapbox");
            if(resp.ok){
                const token = await resp.text();
                setToken(token);
            }
        };

        fetchToken();
    }, []);

    if(token == "") {
        return <div id="map-content"/>
    }

    const Map = ReactMapboxGl({
        accessToken: token
    });

    return (
        <div id="map-content">
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '100%',
                    width: '100%'
                }}
                center={[-0.481747846041145, 51.3233379650232]}
                zoom={[1]}
                onStyleLoad={map => { console.log(map.listImages()) }}
            >
                <FeatureLayer />
            </Map>;
        </div>
    )
}

export default WeatherMap;