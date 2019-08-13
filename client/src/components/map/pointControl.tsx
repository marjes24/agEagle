import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store"
import { MapMode } from "../../store/map/types";
import PointDrawer from "./pointDrawer";
import { clearPoint, addPoint } from "../../store/map/action";

const PointControl: React.FC = props => {
    const { mode } = useSelector((state: AppState) => state.MapReducer);
    const dispatch = useDispatch();

    const pointSelect = mode === MapMode.POINT;

    const onPoint = (point: number[]) => {
        dispatch(addPoint({ lon: Math.round(point[0]), lat: Math.round(point[1]) }));
    }

    const clear = () => {
        dispatch(clearPoint());
    }

    return pointSelect ? <PointDrawer onPoint={onPoint} onClear={clear} /> : null;
}

export default PointControl;