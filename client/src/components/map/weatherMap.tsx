import React, { useEffect, useState } from "react";
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';

import "./map.scss";
import FeatureLayer from "./featureLayer";
import Instruction from "./instruction";
import RectControl from "./rectControl"
import PointControl from "./pointControl";

const WeatherMap: React.FC = () => {
    const [token, setToken] = useState("");

    //Request the token to render map
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const resp = await fetch("/key/mapbox");
                if (resp.ok) {
                    const token = await resp.text();
                    setToken(token);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchToken();
    }, []);

    if (token === "") {
        return <div id="map-content" />
    }

    const Map = ReactMapboxGl({
        accessToken: token
    });

    return (
        <div id="map-content">
            <Instruction />
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '100%',
                    width: '100%'
                }}
                center={[0, 0]}
                zoom={[1]}
            >
                <ZoomControl position="bottom-right" />
                <FeatureLayer />
                <RectControl />
                <PointControl />
            </Map>;
        </div>
    )
}

export default WeatherMap;