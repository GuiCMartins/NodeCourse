const router = require('express').Router();
const fs = require('fs')

const FILE_PATH = './dev-data/data/tours-simple.json';

const tours = JSON.parse(
    fs.readFileSync(FILE_PATH)
)

router.get('/', (req, res) => {
    res.status(200).json({
        status: "SUCCESS",
        results: tours.length,
        data: {
            tours
        }
    })
});

module.exports = router