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

router.post('/', (req, res) => {
    
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(FILE_PATH, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: "SUCCESS",
            data: {
                tour: newTour
            }
        })
    });
});

module.exports = router