import React, { useEffect } from"react";
import MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw"
import { Feature, Point } from "geojson";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"
import { withMap, WithMapProps }from "./withMap";

type Props = WithMapProps<{ 
    onPoint?: (coords: number[]) => void;
    onClear?: () => void;
}>;

const PointDrawer: React.FC<Props> = props => {
    useEffect(() => {
        // Ininitiate draw control
        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: { trash: true }
        });

        props.map.addControl(draw, "bottom-left");
        draw.changeMode("draw_point");


        type featureArr = Feature<Point>[];

        const onCreate = ({ features }: { features: featureArr }) => {
            const coordinate = features[0].geometry.coordinates;
            if(props.onPoint) props.onPoint(coordinate);


        }

        const onDelete = () => {
            draw.changeMode("draw_point");
            
        }

        props.map.on("draw.create", onCreate);
        props.map.on("draw.delete", onDelete);

        // Cleanup function
        return () => {
            props.map.off("draw.create", onCreate);
            props.map.off("draw.delete", onDelete);
            props.map.removeControl(draw);
            
            if(props.onClear) props.onClear();
        }
    }, []);
    return null;
}

export default withMap(PointDrawer);