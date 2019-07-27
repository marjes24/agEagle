import request from "request";
import { Coordinate } from "./pointGenerator";
import { OPEN_WEATHER_API } from "../utils/readKeys";
import { StatusError } from "../utils/error";

type WeatherPoint = { [key: string]: any };

/**
 * Requests the weatherdata for a list of Coordinates
 */
class WeatherData {
    private coordinates: Coordinate[];
    private apiKey = OPEN_WEATHER_API;

    constructor(c: Coordinate[]) {
        this.coordinates = c;
    }

    public getWeatherData(): Promise<WeatherPoint[]> {
        return new Promise((resolve, reject) => {
            Promise.all(this.coordinates.map(coord => {
                return this.coordWeatherRequest(coord);
            })).then(values => {
                resolve(values);
            }).catch(err => {
                reject(err);
            })
        });
    }

    private coordWeatherRequest(coord: Coordinate): Promise<WeatherPoint> {
        return new Promise((resolve, reject) => {
            const base = "https://api.openweathermap.org/data/2.5/weather?";
            const formArg = (arg: string, value: string | number) => "&" + arg + "=" + value;
            const url = base + 
                formArg("lat", coord.lat) + 
                formArg("lon", coord.long) + 
                formArg("appid", this.apiKey);

            request({
                method: "GET",
                url: url,
                json: true
            }, (err, response, body) => {
                if (err) {
                    reject(err);
                } else if (response.statusCode != 200) {
                    reject(new StatusError(response.statusCode, "Error requesting weathermap data"));
                } else {
                    resolve(body);
                }
            });
        });
    }

}

export default WeatherData;