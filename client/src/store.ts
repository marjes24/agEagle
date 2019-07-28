import { createStore, applyMiddleware, compose, DeepPartial } from "redux";
import  thunk from "redux-thunk";
import { rootReducer, AppState } from "./reducers/appReducer"

declare var window: Window & { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose };

export const configureStore = (initialState = {} as DeepPartial<AppState>) => {

    const middleWare = [thunk];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(applyMiddleware(...middleWare));
    
    return createStore(
        rootReducer,
        initialState, 
        enhancer
    );
}