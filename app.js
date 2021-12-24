const express = require("express");
const { TourRouter } = require("./routes");
const { UserRouter } = require("./routes");

const app = express();
const BASE_URL = "/api/v1";

app.use(express.json());

app.use(BASE_URL, TourRouter);
app.use(BASE_URL, UserRouter);

module.exports = app;
