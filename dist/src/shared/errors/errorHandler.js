import sendResponse from "../utils/response.js";
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    sendResponse(res, statusCode, false, message);
};
export default errorHandler;
