
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

    constructor(code: number, message?: string) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, QueryError.prototype);
    }

    get statusCode() { return this.code }
}

export { QueryError, StatusError }