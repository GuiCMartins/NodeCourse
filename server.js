const express = require('express')

const app = express();

const PORT = 3000

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'SUCCESS',
    })
})

app.listen(PORT, () => {
    console.log("Listen to port: ", PORT);
})