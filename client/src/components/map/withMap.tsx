import React, { ComponentType } from "react";
import { MapContext } from "react-mapbox-gl";
import { Map as MapGl } from "mapbox-gl";

export type WithMapProps<P> = P & MapInnerProps;

type MapInnerProps = {
    map: MapGl
}

export function withMap<P>(C: ComponentType<WithMapProps<P>>) {

    const fc: React.FC<P> = props => (
        <MapContext.Consumer>
            {
                map => <C map={map! as MapGl} {...props} />
            }
        </MapContext.Consumer>
    );

   return fc;
}


