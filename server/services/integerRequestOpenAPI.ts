import request from "request";
import { Readable } from "stream";
import readline from "readline";
import { IntegerRequest } from "./integerRequest";
import { StatusError } from "../utils/error";


export class IntegerRequestOpenAPI extends IntegerRequest {
    constructor(min: number, max: number, n: number) {
        super(min, max, n);
    }

    public async getInts() {
        try {
            const resp = await this.requestInts();
            const intList = await this.parseResponse(resp);
            return intList;
        } catch (err) {
            throw err;
        }
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

    /**
     * Uses random.org to generate list of random points
     * Promise resolves with a text of integers, 2 integers per line
     * @param numInts Number of integers to request
     */
    private requestInts(): Promise<string> {
        return new Promise((resolve, reject) => {
            const url = this.formUrl(this.numInts, this.minNumber, this.maxNumber);
            console.log("requestInts url: %s", url);

            request(url, (err, response, body) => {
                if (err) {
                    reject(err);
                } else if (response.statusCode != 200) {
                    let message = "Error requesting random integers from random.org";
                    if (response.body) message += " response: " + response.body;
                    reject(new StatusError(response.statusCode, message));
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

    private parseResponse(points: string): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const integers = [] as number[];

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
                    pairList.forEach(x => {
                        integers.push(parseInt(x));
                    })
                }
            });


            rl.on("close", () => {
                resolve(integers);
            });
        });
    }
}

export default IntegerRequestOpenAPI;
