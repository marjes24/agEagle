import request from "request";
import { StatusError } from "../utils/error";
import { genUuid } from "../utils/genUuid";
import { RANDOM_ORG_API } from "../utils/readKeys";
import { IntegerRequest } from "./integerRequest";

/**
 * Response type from random.org
 */
type ApiResponse = {
    jsonrpc: string,
    result: {
        random: {
            data: number[],
            completionTime: string
        },
        bitsUsed: number,
        bitsLeft: number,
        requestsLeft: number,
        advisoryDelay: number
    },
    id: string
}

/**
 * Uses random.org's json-rpc api to request a list of integers
 */
export class IntegerRequestKeyAPI extends IntegerRequest {
    constructor(min: number, max: number, n: number) {
        super(min, max, n);
    }

    public async getInts() {
        try {
            const resp = await this.requestInts();
            const integers = this.parseResponse(resp);
            return integers;
        } catch (err) {
            throw err;
        }
    }

    public async getQuota() {

    }

    private async requestInts(): Promise<ApiResponse> {
        return new Promise((resolve, reject) => {
            const requestOpts = this.genRequestOpts();

            request(
                requestOpts,
                (err, response, body) => {
                    if (err) {
                        reject(err);
                    } else if (response.statusCode === 200) {
                        resolve(body);
                    } else {
                        let message = "Error requesting random integers from random.org";
                        if (response.body) message += " response: " + response.body;
                        reject(new StatusError(response.statusCode, message));
                    }
                }
            )
        });
    }

    private genRequestOpts() {
        const url = "https://api.random.org/json-rpc/2/invoke";
        const reqBody = {
            "jsonrpc": "2.0",
            "method": "generateIntegers",
            "params": {
                "apiKey": RANDOM_ORG_API,
                "n": this.numInts,
                "min": this.minNumber,
                "max": this.maxNumber,
                "replacement": true
            },
            "id": genUuid()
        };

        return {
            url: url,
            json: true,
            method: "POST",
            body: reqBody
        };
    }

    private parseResponse(response: any): number[] {
        try { 
            const list = response.result.random.data;
            return list;
        } catch(err) {
            throw new Error("Error parsing json response");
        }
    }
}

export default IntegerRequestKeyAPI;