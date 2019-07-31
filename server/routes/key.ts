import { Router } from "express";
import {  MAP_BOX_API } from "../utils/readKeys"

const route = Router();

route.get("/mapbox", (req, res, next) => {
    try {   
        console.log("/key/mapbox request");
        res.set(200).send(MAP_BOX_API)
    } catch(err) {
        res.set(500).send(err);
    }
});

export default route;