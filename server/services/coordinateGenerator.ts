import IntegerRequestKeyAPI from "./integerRequestKeyAPI";

export interface Coordinate {
    lat: number;
    long: number
}
/**
 * Provides randomly generated coordinates
 */
class CoordinateGenerator {

    constructor() {
    }

    async getCoordinates(numPoints: number) {
        try {
            const intReq = new IntegerRequestKeyAPI(-180, 180, numPoints * 2);
            const randInts = await intReq.getInts();
            const coordinates = this.parsePoints(randInts);
            
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

}

export default CoordinateGenerator;