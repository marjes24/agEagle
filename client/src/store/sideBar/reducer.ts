import { SidebarState, display, SidebarActions, SET_SIDEBAR_DISPLAY} from "./types";

const initialState: SidebarState = {
    display: display.WEATHER_REQUEST
};

export const SidebarReducer = (
    state = initialState,
    action: SidebarActions
): SidebarState => {
    switch(action.type) {
        case SET_SIDEBAR_DISPLAY: 
            return {
                ...state,
                display: action.display
            };
        default: 
            return state;
    }
}