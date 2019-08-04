import { NextFunction, Request, Response } from "express";
import { QueryError } from "../utils/error";
import { Range } from "../services/coordinateGenerator";

export const validateWeatherQuery = (req: Request, res: Response, next: NextFunction) => {
    try {
        type queryArgs = { points: string, [key: string]: string };

        // Read and validate number of points
        const { points } = <queryArgs>req.query;
        if (points == undefined) throw new QueryError("Undefined query argument: points=<int>");
        if (isNaN(parseInt(points))) throw new QueryError("Argument points=<int> is not an integer");
        if (parseInt(points) < 0) throw new QueryError("Argument points=<int> must be positive");

        // Read and validate ranges
        const BASE_LAT: Range = { min: -90, max: 90 };
        const BASE_LON: Range = { min: -180, max: 180 };

        const inLatRange = (x: number) => inRange(x, { ...BASE_LAT })
        const inLonRange = (x: number) => inRange(x, { ...BASE_LON });

        let { maxLat, minLat, maxLon, minLon } = <queryArgs>req.query;
        const latRange: Range = { ...BASE_LAT };
        const lonRange: Range = { ...BASE_LON };

        if (maxLat) {
            if (isNaN(parseInt(maxLat))) throw new QueryError("Argument maxLat=<int> is not a valid integer");
            latRange.max = parseInt(maxLat);
        }
        if (minLat) {
            if (isNaN(parseInt(minLat))) throw new QueryError("Argument minLat=<int> is not a valid integer");
            latRange.min = parseInt(minLat);
        }
        if (latRange.min > latRange.max) {
            throw new QueryError("Argument minLat cannot be greater than maxlat");
        }
        if (!inLatRange(latRange.min) || !inLatRange(latRange.max)) {
            throw new QueryError("Latitude values should be between [-90,90]");
        }

        if (maxLon) {
            if (isNaN(parseInt(maxLon))) throw new QueryError("Argument maxLon=<int> is not a valid integer");
            lonRange.max = parseInt(maxLon);
        }
        if (minLon) {
            if (isNaN(parseInt(minLon))) throw new QueryError("Argument minLon=<int> is not a valid integer");
            lonRange.min = parseInt(minLon);
        }
        if (lonRange.min > lonRange.max) {
            throw new QueryError("Argument minLon cannot be greater than maxLon");
        }
        if (!inLonRange(lonRange.min) || !inLonRange(lonRange.max)) {
            throw new QueryError("Longitude values must be between [-180, 180]");
        }

        req.query.latRange = latRange;
        req.query.lonRange = lonRange;
        next();
    } catch (err) {
        if (err instanceof QueryError) {
            res.status(400).send(err.message);
        } else {
            throw err;
        }
    }
};

const inRange = (x: number, r: Range) => {
    return x >= r.min && x <= r.max;
}

