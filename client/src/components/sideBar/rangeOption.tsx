import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppState } from "../../store/index";
import RangeInput from "./rangeInput";
import { setMapMode } from "../../store/map/action";
import { MapMode } from "../../store/map/types";

const RangeOption: React.FC = props => {
    const dispatch = useDispatch();
    const { selectedRange: rect } = useSelector((state: AppState) => state.MapReducer);
    
    const [expand, setExpand] = useState(false);

    const latRange = { max: "90", min: "-90" };
    const lonRange = { max: "180", min: "-180" };

    const getStr = (x: number) => Math.floor(x).toString()

    if (rect) {
        latRange.max = getStr(rect.maxLat);
        latRange.min = getStr(rect.minLat);
        lonRange.max = getStr(rect.maxLon);
        lonRange.min = getStr(rect.minLon);
    }

    const expandIcon = expand ? faChevronUp : faChevronDown;

    const toggleExpand = (shouldExpand: boolean) => {
        setExpand(shouldExpand);
        if(shouldExpand) { 
            dispatch(setMapMode(MapMode.RECT));
        } else {
            dispatch(setMapMode(MapMode.NONE));
        }
    }

    return (
        <div
            id="range-option"
            className={expand ? "open" : "close"}
            onClick={e => toggleExpand(true)}
        >
            {
                !expand &&
                <>
                    <div className="btn-title">
                        Set coordinate range (optional)
                    </div>
                </>
            }
            {
                expand &&
                <>
                    <RangeInput range={latRange} title="Latitude" disabled={true}/>
                    <RangeInput range={lonRange} title="Longitude" disabled={true}/>
                </>
            }
            <div className="expand" onClick={e => { e.stopPropagation(); toggleExpand(!expand) }}>
                <FontAwesomeIcon icon={expandIcon} />
            </div>
        </div>
    );
};


export default RangeOption;