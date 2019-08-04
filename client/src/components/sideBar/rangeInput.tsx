import React from "react";
import { validIntegerInput } from "../../shared/allDigits";

interface RangeInputProps {
    setRange: (x: { max: string, min: string }) => void;
    range: { max: string, min: string }
    title?: string
}

const RangeInput: React.FC<RangeInputProps> = props => {

    const setMax = ({ value: max }: { value: string }) => {
        if (validIntegerInput(max)) props.setRange({ ...props.range, max });
    }

    const setMin = ({ value: min }: { value: string }) => {
        if (validIntegerInput(min)) props.setRange({ ...props.range, min });
    }

    return (
        <>
            {props.title && <div className="range-title">{props.title}</div>}
            <div className="input-wrapper">
                <input
                    className="min-range"
                    type="text"
                    placeholder="Min"
                    value={props.range.min}
                    onChange={e => setMin(e.target)}
                />
                <input
                    className="max-range"
                    type="text"
                    placeholder="Max"
                    value={props.range.max}
                    onChange={e => setMax(e.target)}
                />
            </div>
        </>
    );
}

export default RangeInput;