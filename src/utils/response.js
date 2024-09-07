class Response {
    constructor(status, message, data, statusCode) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode
    }

    static success(message, data, statusCode = 200) {
        return new Response('success', message, data, statusCode);
    }

    static error(message, statusCode = 500) {
        return new Response('error', message, null, statusCode);
    }

}

module.exports = Response;