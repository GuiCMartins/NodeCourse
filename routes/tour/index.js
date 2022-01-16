const router = require("express").Router();
const { useTourController, useAuthController } = require("../../controllers");
const { useTourMiddleware } = require("../../middlewares");

const BASE_URL = "/tours";
const tourController = useTourController();
const tourMiddleware = useTourMiddleware();
const authController = useAuthController();

router.get(`${BASE_URL}/top-5-cheap`, tourMiddleware.aliasTopTours , tourController.getAllTours)

router.get(`${BASE_URL}/monthly-plan/:year`, tourController.getMonthlyPlan)

router.get(`${BASE_URL}/tour-stats` , tourController.getStats)

router.get(BASE_URL, authController.protect, tourController.getAllTours);

router.get(`${BASE_URL}/:id`, tourController.getOneTour);

router.post(BASE_URL, tourController.createOneTour);

router.patch(`${BASE_URL}/:id`, tourController.updateOneTour);

router.delete(`${BASE_URL}/:id`, tourController.deleteOneTour);

module.exports = router;
