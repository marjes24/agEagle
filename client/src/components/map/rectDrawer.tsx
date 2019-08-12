import React, { useEffect } from "react";
import { Map as MapGl } from "mapbox-gl";
import { Feature, Polygon } from "geojson";
import MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw"
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"

import { withMap } from "./withMap";

interface Props {
    map: MapGl;
    onRectangle?: (coords: number[][]) => void;
}

const RectDrawer: React.FC<Props> = props => {

    useEffect(() => {
        // Set up rectangle mode from library
        const modes = MapboxDraw.modes;
        modes.draw_rectangle = DrawRectangle;

        // Ininitiate draw control
        const draw = new MapboxDraw({
            modes,
            displayControlsDefault: false,
            controls: { trash: true }
        });

        props.map.addControl(draw, "bottom-left");
        draw.changeMode("draw_rectangle");


        type featureArr = Feature<Polygon>[];

        const onCreate = ({ features }: { features: featureArr }) => {
            // Get coordinates and pop last element(equivalent to first element)
            const coordinates = features[0].geometry.coordinates[0];
            coordinates.pop();

            if (props.onRectangle) props.onRectangle(coordinates);
        }

        const onDelete = () => {
            draw.changeMode("draw_rectangle");
            if(props.onRectangle) props.onRectangle([[0,0]]);
        }

        props.map.on("draw.create", onCreate);
        props.map.on("draw.delete", onDelete);

        // Cleanup function
        return () => {
            props.map.off("draw.create", onCreate);
            props.map.off("draw.delete", onDelete);
            props.map.removeControl(draw);
        }
    }, []);


    return null;
}

export default withMap(RectDrawer);