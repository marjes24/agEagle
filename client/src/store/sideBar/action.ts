import { 
    SET_SIDEBAR_DISPLAY, 
    SidebarDisplayAction,
    display
} from "./types";

export const setSidebarDisplay = (newDisplay: display): SidebarDisplayAction => {
    return {
        type: SET_SIDEBAR_DISPLAY,
        display: newDisplay
    };
};