const express = require('express')
require('dotenv').config()

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'SUCCESS',
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Listen to port: ${process.env.PORT} ....`);
})