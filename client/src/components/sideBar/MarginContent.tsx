import { FC } from "react";
import { display } from "../../store/sideBar/types";

interface Props { 
    display: display;
    setDisplay: (d: display) => void;
}


const MarginContent: FC<Props> = props => {
    return (
        <div id="margin-content"> </div>
    );
}