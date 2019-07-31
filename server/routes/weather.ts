import { Router } from "express";
import CoordinateGenerator from "../services/coordinateGenerator";
import WeatherData from "../services/weatherData";
import { QueryError, StatusError } from "../utils/error";
import { testWeatherData } from "../utils/getTestData";

const route = Router();

route.get("/data/random", async (req, res, next) => {
    try {
        type queryArgs = { points: string, [key: string]: string };

        // Read and validate query arg
        const { points } = <queryArgs>req.query;
        if (points == undefined) throw new QueryError("Undefined query argument: points=<int>");
        if (isNaN(parseInt(points))) throw new QueryError("Argument points=<int> is not an integer");
        if (parseInt(points) < 0) throw new QueryError("Argument points=<int> must be positive");

        const numPoints = Math.round(parseInt(points));

        // Generate random coordinates and get weather data
        const cG = new CoordinateGenerator();
        const coordinates = await cG.getCoordinates(numPoints);

        const wD = new WeatherData(coordinates);
        const data = await wD.getWeatherData();

        res.status(200).json(data);
    } catch (err) {
        console.error("/data/random error: %s", err);
        let status = 500;
        let errMessage = "Something went wrong";

        if(err instanceof QueryError) { 
            status = 400;
            errMessage = err.message;
        } else if (err instanceof StatusError) {
            errMessage = err.message;
        } else if (err instanceof Error) {
            errMessage = err.message;
        }

        res.type("text/plain").status(status).send(errMessage);
    }
});

route.get("/data/coordinate", async (req, res, next) => {
    try { 
        type queryArgs = { lat: string, long: string, [key: string]: any };
        const { lat, long } = req.query as queryArgs;

        // Validate query arguments
        let queryError = false;
        if(lat == null || long == null) queryError = true;
        if(isNaN(parseInt(lat)) || isNaN(parseInt(long))) queryError = true;
        if(Math.abs(parseInt(lat)) > 90 || Math.abs(parseInt(long)) > 180) queryError = true;
        if(queryError)
            throw new QueryError("Error in query arguments: lat=<int> long=<int> where abs(lat) < 90 and abs(long) < 180");

        const coord = { 
            lat: Math.round(parseInt(lat)),
            long: Math.round(parseInt(long))
        };

        // Get weather data for single coordinate
        const wD = new WeatherData([coord]);
        const data = await wD.getWeatherData();

        res.status(200).json(data);
    } catch(err) { 
        console.error("/data/coordinate error: %s", err);
        let status = 500;
        let errMessage = "Something went wrong";

        if(err instanceof QueryError) { 
            status = 400;
            errMessage = err.message;
        } else if (err instanceof Error) {
            errMessage = err.message;
        }

        res.type("text/plain").status(status).send(errMessage);
    }
});


/**
 * API route for testing to prevent overusing api requests
 */
if(process.env.NODE_ENV === "development") {
    route.get("/data/test", (req, res, next) => {
        console.warn("USING TEST ROUTE");
        res.set(200).send(testWeatherData());
    });
}


export default route;