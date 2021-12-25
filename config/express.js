const express = require('express');
const bearerToken = require('express-bearer-token');
const APIError = require('../app/helpers/APIError');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const expressValidation = require('express-validation')
const logger = require('morgan')
const requestIp = require('request-ip')
const jsonLog = require('morgan-json')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express();

logger.token("clientRealIp", function (req, res) {
    var ip = requestIp.getClientIp(req);
    return ip || undefined;
});
const loggerFormat = jsonLog({
    "@timestamp": ":date[iso]",
    method: ":method",
    path: ":url",
    http: " HTTP/:http-version",
    status: ":status",
    remote_addr: ":clientRealIp",
    length: ":res[content-length]",
    "response-time": ":response-time ms",
    referrer: ":referrer",
    "user-agent": ":user-agent",
});
app.use(logger(loggerFormat));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bearerToken());
app.use(cookieParser());
app.use(compress());
app.use(cors())
app.use(helmet());

const appRoutes = require('../app/routes/index.routes')

app.use('/api', appRoutes)


// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors
            .map((error) => error.messages.join(". "))
            .join(" and ");
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next();
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic);
        return next();
    }
    return next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError("API not found", httpStatus.NOT_FOUND);
    return next();
});


// error handler, send stacktrace only during development
app.use((err, req, res, next) =>
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: config.env === "local" ? err.stack : {},
    })
);

module.exports = app;
