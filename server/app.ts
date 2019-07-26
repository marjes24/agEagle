import express from "express";
import PointGenerator from "./pointGenerator";
import WeatherData from "./weatherData";

const app = express();

app.set("port", process.env.PORT || 3500);

app.get("/test", async (req, res, next) => {
    try {
        const pG = new PointGenerator;
        const coordinates = await pG.getPoints(50);
        
        const wD  = new WeatherData(coordinates);
        const data = await wD.getWeatherData();

        res.status(200).json(data);
    } catch (err) {
        console.error("Error /test %s", err);
        res.status(500).send("Something went wrong");
    }
});

app.get("/quota", async (req, res, next) => {
    try {
        let p = new PointGenerator;

        let quota = await p.getQuota();
        res.header("Content-Type", "text/plain");
        res.send(quota);
    } catch (err) {

    }
});

export default app;