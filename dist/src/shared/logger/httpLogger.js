import { pinoHttp } from "pino-http";
import logger from "./logger.js";
const httpLogger = pinoHttp({
    logger,
    customLogLevel: (req, res, error) => {
        if (error || res.statusCode >= 500) {
            return "error";
        }
        if (res.statusCode >= 400) {
            return "warn";
        }
        return "info";
    },
    customSuccessMessage: (req, res) => {
        return `${req.method} ${req.url} - ${res.statusCode}`;
    },
    customErrorMessage: (req, res, error) => {
        return `${req.method} ${req.url} - ${res.statusCode} - ${error.message}`;
    },
});
export default httpLogger;
