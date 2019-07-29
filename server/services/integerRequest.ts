/**
 * Abstract class to describe integer request interaction methods
 */
export abstract class IntegerRequest {
    protected maxNumber: number;
    protected minNumber: number;
    protected numInts: number;

    constructor(min: number, max: number, n: number) {
        this.maxNumber = max;
        this.minNumber = min;
        this.numInts = n;
    }

    abstract async getInts(): Promise<number[]>;
    abstract async getQuota(): Promise<any>;
}