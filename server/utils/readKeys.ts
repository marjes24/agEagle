import fs from "fs";

let OPEN_WEATHER_API = "";
let RANDOM_ORG_API = "";
let MAP_BOX_API = "";

try { 
    const rawData = fs.readFileSync("./secrets.json");
    const data = JSON.parse(rawData.toString()) as { [key: string]: string };
    if("OPEN_WEATHER_API" in data) {
        OPEN_WEATHER_API = data.OPEN_WEATHER_API.trim();
    }
    if("RANDOM_ORG_API" in data) {
        RANDOM_ORG_API = data.RANDOM_ORG_API.trim();
    }
    if("MAP_BOX_API" in data) {
        MAP_BOX_API = data.MAP_BOX_API.trim();
    }
} catch(err) {
    console.error("Error reading api keys, err: %s", err);
}

export { OPEN_WEATHER_API, RANDOM_ORG_API, MAP_BOX_API }