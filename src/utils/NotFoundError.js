import ApiError from "./ApiError.js";

class NotFoundError extends ApiError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export default NotFoundError;
