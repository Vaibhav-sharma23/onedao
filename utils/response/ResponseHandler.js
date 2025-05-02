import ResponseStatus from './ResponseStatus.js';
class ResponseHandler {
    static success(res, data, message = '', statusCode = ResponseStatus.SUCCESS.OK) {
        return res.status(statusCode).json({
            success: true,
            status: statusCode,
            message,
            data
        });
    }

    static error(res, message = 'Internal Server Error', statusCode = ResponseStatus.SERVER_ERROR.INTERNAL_ERROR) {
        return res.status(statusCode).json({
            success: false,
            status: statusCode,
            message
        });
    }

    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, ResponseStatus.CLIENT_ERROR.NOT_FOUND);
    }

    static badRequest(res, message = 'Bad request') {
        return this.error(res, message, ResponseStatus.CLIENT_ERROR.BAD_REQUEST);
    }

    static unauthorized(res, message = 'Unauthorized') {
        return this.error(res, message, ResponseStatus.CLIENT_ERROR.UNAUTHORIZED);
    }

    static forbidden(res, message = 'Forbidden') {
        return this.error(res, message, ResponseStatus.CLIENT_ERROR.FORBIDDEN);
    }
}
export default ResponseHandler;