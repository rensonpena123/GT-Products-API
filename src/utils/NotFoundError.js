import ApiError from "./ApiError";

class NotFoundError extends ApiError {
    constructor(message = 'Resource not found') {
        super(404, message);
    }
}

export default NotFoundError;
