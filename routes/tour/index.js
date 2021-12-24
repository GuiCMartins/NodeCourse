const router = require("express").Router();
const { useTourController } = require("../../controllers");
const { useCommonMiddleware, useTourMiddleware } = require("../../middlewares");

const BASE_URL = "/tours";
const tourController = useTourController();
const commonMiddleware = useCommonMiddleware();
const tourMiddleware = useTourMiddleware();

router.param("id", commonMiddleware.checkId);

router.get(BASE_URL, tourController.getAllTours);

router.get(`${BASE_URL}/:id`, tourController.getOneTour);

router.post(BASE_URL, tourMiddleware.checkBodyRequest, tourController.createOneTour);

router.patch(`${BASE_URL}/:id`, tourController.updateOneTour);

router.delete(`${BASE_URL}/:id`, tourController.deleteOneTour);

module.exports = router;
