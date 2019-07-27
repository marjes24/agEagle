import fs from "fs";

let OPEN_WEATHER_API = "";

try { 
    const rawData = fs.readFileSync("./secrets.json");
    const data = JSON.parse(rawData.toString()) as { [key: string]: string };
    if("OPEN_WEATHER_API" in data) {
        OPEN_WEATHER_API = data.OPEN_WEATHER_API.trim();
    }
} catch(err) {
    console.error("Error reading api keys, err: %s", err);
}

export { OPEN_WEATHER_API }