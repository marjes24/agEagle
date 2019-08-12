import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RectDrawer from "./rectDrawer";
import { AppState } from "../../store";
import { DrawMode } from "../../store/map/types";

interface Props { }

const RectControl: React.FC<Props> = props => {
    const { drawMode } = useSelector((state: AppState) => state.MapReducer);

    const onRectangle = (coordinates: number[][]) => {
        const getMin = (arr: number[]) => arr.reduce((acc, curr) => {
            return curr < acc ? curr : acc;
        }, Infinity);

        const getMax = (arr: number[]) => arr.reduce((acc, curr) => {
            return curr > acc ? curr : acc;
        }, -Infinity);

        const lngList = coordinates.map(point => point[0]);
        const latList = coordinates.map(point => point[1]);

        const rect = {
            maxLng: getMax(lngList),
            minLng: getMin(lngList),
            maxLat: getMax(latList),
            minLat: getMin(latList)
        };
    };

    const drawRect = drawMode === DrawMode.RECT;
    return drawRect ?
        <RectDrawer onRectangle={onRectangle} /> :
        null;
};

export default RectControl;