import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { AppState } from "../../store";
import { display } from "../../store/sideBar/types";
import MarginMenu from "./marginMenu";
import MarginContent from "./marginContent"
import { setSidebarDisplay } from "../../store/sideBar/action";
import { MapMode } from "../../store/map/types";
import { setMapMode } from "../../store/map/action";

const SideBar: React.FC = props => {
    const display = useSelector<AppState, display>(state => state.SidebarReducer.display);
    const dispatch = useDispatch<Dispatch<AnyAction>>();

    const setDisplay = (disp: display) => { dispatch(setSidebarDisplay(disp)) };
    const setMap = (mode: MapMode) => { dispatch(setMapMode(mode)) };

    return (
        <div id="side-bar">
            <MarginMenu
                display={display}
                setDisplay={setDisplay}
                setMapMode={setMap}
            />
            <MarginContent
                display={display}
                setDisplay={setDisplay}
            />
        </div>
    );
};

export default SideBar;

