import IntegerRequestKeyAPI from "./integerRequestKeyAPI";

export interface Coordinate {
    lat: number;
    long: number
}

export interface Range { 
    min: number,
    max: number
}

/**
 * Provides randomly generated coordinates
 */
class CoordinateGenerator {

    constructor() {
    
    }

    async getCoordinates(numPoints: number, latRange: Range, lonRange: Range) {
        try {
            const latReq = new IntegerRequestKeyAPI(latRange.min, latRange.max, numPoints);
            const lonReq = new IntegerRequestKeyAPI(lonRange.min, lonRange.max, numPoints);

            const coordList = await Promise.all([
                lonReq.getInts(),
                latReq.getInts()
            ]);

            const coordinates = this.formCoordinates(coordList[0], coordList[1]);

            return coordinates;
        } catch (err) {
            throw err;
        }
    }



    private formCoordinates(lonList: number[], latList: number[]) {
        try {
            if (lonList.length !== latList.length) throw Error("Uneven number of integers generated");

            const coordinates: Coordinate[] = [];
            for (let i = 0; i < lonList.length; ++i) {
                coordinates.push({
                    long: lonList[i],
                    lat: latList[i]
                });
            }

            return coordinates;
        } catch (err) {
            throw err;
        }
    }

    private parsePoints(integers: number[]): Coordinate[] {
        if (integers.length % 2 != 0) throw Error("Uneven number of integers generated");

        const coordinates = [] as Coordinate[];

        for (let i = 0; i < integers.length; i += 2) {
            const coord = {
                lat: Math.floor(integers[i] / 2),
                long: integers[i + 1]
            };

            coordinates.push(coord);
        }
        return coordinates;
    }

    static formRanges () {

    }

}

export default CoordinateGenerator;