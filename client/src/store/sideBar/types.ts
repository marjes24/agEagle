export enum display { 
    WEATHER_COORDS = "WEATHER_COORDS",
    WEATHER = "WEATHER",
    WEATHER_REQUEST = "WEATHER_REQUEST",
    SEARCH = "SEARCH",
    ADD_COORD = "ADD_COORD"
}

export interface SidebarState { 
    display: display
}

export const SET_SIDEBAR_DISPLAY = "SET_WEATHER_DISPLAY";

export interface SidebarDisplayAction { 
    type: typeof SET_SIDEBAR_DISPLAY,
    display: display
}

export type SidebarActions = SidebarDisplayAction;