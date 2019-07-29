
/**
 * Error to throw for malformed query or route arguments
 */
class QueryError extends Error {
    constructor(message?: string) {
        super(message);

        Object.setPrototypeOf(this, QueryError.prototype);
    }
}

/**
 * Error to throw when foreign api request returned a non 200 code
 */
class StatusError extends Error {
    private code: number;
    private response: string | object;

    constructor(code: number, response: string | object, message?: string) {
        super(message);
        this.code = code;
        this.response = response; 
        Object.setPrototypeOf(this, QueryError.prototype);
    }

    get statusCode() { return this.code }
    get responseBody() { return this.response }
}

export { QueryError, StatusError }