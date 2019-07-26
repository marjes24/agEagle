import request from "request";
import { Readable } from "stream";
import readline from "readline";

export interface Coordinate {
    lat: number,
    long: number
}

/**
 * Provides randomly generated coordinates
 */
class PointGenerator {
    constructor() { }

    public async getPoints(numPoints: number) {
        try {
            const randInts = await this.requestInts(numPoints * 2);
            const coordinates = await this.parsePoints(randInts);
            return coordinates;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Uses random.org to generate list of random points
     * Promise resolves with a text of integers, 2 integers per line
     * @param numInts Number of integers to request
     */
    private requestInts(numInts: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const url = this.formUrl(numInts, -180, 180);
            console.log("requestInts url: %s", url);

            request(url, (err, response, body) => {
                if (err) {
                    reject(err);
                } else if (response.statusCode != 200) {
                    reject(new Error("status code: " + response.statusCode));
                } else {
                    resolve(<string>body);
                }
            });
        });
    }

    private formUrl(num: number, min: number, max: number) {
        const base = "https://www.random.org/integers/?base=10&format=plain&rnd=new&col=2";

        const formArg = (key: string, arg: number) => "&" + key + "=" + arg;

        const url = base + formArg("num", num) + formArg("min", min) + formArg("max", max);
        return url;
    }

    private parsePoints(points: string): Promise<Coordinate[]> {
        return new Promise((resolve, reject) => {
            const coordinates = [] as Coordinate[];

            const rStream = new Readable();
            rStream.push(points);
            rStream.push(null);

            const rl = readline.createInterface({
                input: rStream
            });

            rl.on("line", line => {
                const pairList = line.trim().split(/\s+/);
                if (pairList.length != 2 || isNaN(parseInt(pairList[0]))) {
                    console.log("Parse points, will force close");
                    rl.close();
                } else {
                    const cord = {
                        lat: Math.round(parseInt(pairList[0]) / 2),
                        long: parseInt(pairList[1])
                    }
                    coordinates.push(cord);
                }
            });


            rl.on("close", () => {
                resolve(coordinates);
            });
        })

    }

    public getQuota(): Promise<string> {
        return new Promise((resolve, reject) => {
            request("https://www.random.org/quota/?format=plain", (err, response, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(<string>body);
                }
            });
        });
    }
}

export default PointGenerator;