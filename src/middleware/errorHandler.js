const Response = require('../utils/response');
require('dotenv').config();

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        const response = Response.error(err.message, statusCode);
        return res.status(response.statusCode).json(response);
    } else {
        const response = Response.error('Internal Server Error', 500);
        return res.status(response.statusCode).json(response);
    }
};

module.exports = errorHandler;