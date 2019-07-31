import React from "react";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Instruction: React.FC = () => {
    return (
        <div className="map-instruction">
            { "Click on map marker  " }
            <FontAwesomeIcon icon={faCloud} />
            { " to view weather details" }
        </div>
    );
}

export default Instruction;