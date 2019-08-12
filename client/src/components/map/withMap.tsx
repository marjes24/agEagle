import React, { ComponentType } from "react";
import { MapContext } from "react-mapbox-gl";
import { Map as MapGl } from "mapbox-gl";

export function withMap<P>(C: ComponentType<P>) {

    type Diff<T, U> = T extends U ? never : T;
    
    // Return props is type of props P minus prop "map"
    type RetProps = {
        [k in Diff<keyof P, "map">]: P[k];
    }

    const fc: React.FC<RetProps> = props => (
        <MapContext.Consumer>
            {
                map => <C map={map! as MapGl} {...props as P} />
            }
        </MapContext.Consumer>
    );

   return fc;
}


