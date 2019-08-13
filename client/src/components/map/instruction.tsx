import React from "react";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { MapMode } from "../../store/map/types";

const Instruction: React.FC = () => {
    const { mode } = useSelector((state: AppState) => state.MapReducer);

    if (mode === MapMode.WEATHER) {
        return (
            <div className="map-instruction">
                {"Click on map marker  "}
                <FontAwesomeIcon icon={faCloud} />
                {" to view weather details"}
            </div>
        );
    } else if (mode === MapMode.RECT) {
        return (
            <div className="map-instruction">
                Click on map to draw coordinate bounds
            </div>
        );
    } else {
        return null;
    }
}

export default Instruction;