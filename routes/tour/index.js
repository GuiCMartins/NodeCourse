const router = require("express").Router();
const { useTourController } = require("../../controllers");
const { useTourMiddleware } = require("../../middlewares")

const BASE_URL = "/tours";
const tourController = useTourController();
const tourMiddleware = useTourMiddleware()

router.get(`${BASE_URL}/top-5-cheap`, tourMiddleware.aliasTopTours , tourController.getAllTours)

router.get(`${BASE_URL}/tour-stats` , tourController.getStats)

router.get(BASE_URL, tourController.getAllTours);

router.get(`${BASE_URL}/:id`, tourController.getOneTour);

router.post(BASE_URL, tourController.createOneTour);

router.patch(`${BASE_URL}/:id`, tourController.updateOneTour);

router.delete(`${BASE_URL}/:id`, tourController.deleteOneTour);

module.exports = router;
