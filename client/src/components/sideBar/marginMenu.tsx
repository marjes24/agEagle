import React, { FC } from "react";
import { display } from "../../store/sideBar/types";
import { faCloud, faSync, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sideBar.scss";

interface Props {
    display: display;
    setDisplay: (d: display) => void;
}

const MarginMenu: FC<Props> = props => {
    const displayEquals = (d: display) => d === props.display;
    return (
        <div id="margin-menu">
            <ul>
                <MarginItem
                    selected={displayEquals(display.WEATHER) || displayEquals(display.WEATHER_COORDS)}
                    title="Weather"
                    onClick={() => {props.setDisplay(display.WEATHER_COORDS)}}
                >
                    <FontAwesomeIcon
                        icon={faCloud}
                        size="lg"
                        color="white"
                    />
                </MarginItem>
                <MarginItem 
                    selected={displayEquals(display.WEATHER_REQUEST)} 
                    title="Data Request"
                    onClick={() => {props.setDisplay(display.WEATHER_REQUEST)}}
                >
                    <FontAwesomeIcon
                        icon={faSync}
                        size="lg"
                        color="white"
                    />
                </MarginItem>
                <MarginItem 
                    selected={displayEquals(display.SEARCH)} 
                    title="Search"
                    onClick={() => {props.setDisplay(display.SEARCH)}}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size="lg"
                        color="white"
                    />
                </MarginItem>
            </ul>
        </div>
    );
};

const MarginItem: FC<{ selected: boolean, title: string, onClick: () => void }> = props => {
    return (
        <li
            className={"nav" + (props.selected ? " selected" : "" )}
            title={props.title}
            onClick={e => props.onClick()}
        >
            {props.children}
        </li>
    );
}

export default MarginMenu;
