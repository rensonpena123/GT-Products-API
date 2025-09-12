const deprecationWarning = (req, res, next) => {
    res.set('X-API-Warn', 'This API version is deprecated');
    next();
};

export default deprecationWarning;