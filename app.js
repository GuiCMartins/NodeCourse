const express = require("express");
const { AppError } = require('./utils')
const { useErrorHandler } = require('./errors')
const { TourRouter } = require("./routes");
const { UserRouter } = require("./routes");

const app = express();
const errorHandler = useErrorHandler();
const BASE_URL = "/api/v1";

app.use(express.json());

app.use(BASE_URL, TourRouter);
app.use(BASE_URL, UserRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler.genericErrorHandler)

module.exports = app;
