import {
    combineReducers,
    createStore,
    applyMiddleware,
    compose,
    DeepPartial
} from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import { weatherReducer } from "./weather/reducer";
import { WeatherActionTypes, WeatherState } from "./weather/types";
import { SidebarReducer } from "./sideBar/reducer";
import { SidebarActions, SidebarState } from "./sideBar/types";
import { MapReducer } from "./map/reducer";
import { MapState, MapActionTypes } from "./map/types";

// extend window to include redux devtools definition
declare var window: Window & { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose };

export interface AppState {
    weatherReducer: WeatherState,
    SidebarReducer: SidebarState,
    MapReducer: MapState
}

export const rootReducer = combineReducers<AppState>({
    weatherReducer,
    SidebarReducer,
    MapReducer
});

export type AppActions = WeatherActionTypes | SidebarActions | MapActionTypes;

export const configureStore = (initialState = {} as DeepPartial<AppState>) => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
    );

    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}