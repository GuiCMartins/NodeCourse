const express = require('express')
const apiRoute = require('./routes/api')
require('dotenv').config()

const app = express();

app.use('/api', apiRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listen to port: ${process.env.PORT} ....`);
})