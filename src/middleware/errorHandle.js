import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default errorHandler;