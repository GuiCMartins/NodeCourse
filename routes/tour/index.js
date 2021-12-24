const router = require("express").Router();
const { useTourController } = require("../../controllers");

const BASE_URL = "/tours";
const tourController = useTourController();

router.get(BASE_URL, tourController.getAllTours);

router.get(`${BASE_URL}/:id`, tourController.getOneTour);

router.post(BASE_URL, tourController.createOneTour);

router.patch(`${BASE_URL}/:id`, tourController.updateOneTour);

router.delete(`${BASE_URL}/:id`, tourController.deleteOneTour);

module.exports = router;
