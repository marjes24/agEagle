import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import { AppState } from "../../store";
import { display } from "../../store/sideBar/types";
import MarginMenu from "./marginMenu";
import { setSidebarDisplay } from "../../store/sideBar/action";


const SideBar: React.FC = props => {
    const display = useSelector<AppState, display>(state => state.SidebarReducer.display);
    const dispatch = useDispatch<Dispatch<AnyAction>>();

    const setDisplay = (disp: display) => { dispatch(setSidebarDisplay(disp)) };

    return (
        <div id="side-bar"> 
            <MarginMenu 
                display={display}
                setDisplay={setDisplay} 
            />
        </div>
    );
};

export default SideBar;

