import React, { FC } from "react";
import { display } from "../../store/sideBar/types";

interface Props { 
    display: display;
    setDisplay: (d: display) => void;
}

const MarginMenu: FC<Props> = props => {

    return (
        <div id="margin-menu">

        </div>
    )
};

export default MarginMenu;
