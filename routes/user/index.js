const router = require("express").Router();
const { useUserController } = require("../../controllers");
const { useCommonMiddleware } = require("../../middlewares");

const BASE_URL = "/users";
const userController = useUserController();
const commonMiddleware = useCommonMiddleware();

router.param("id", commonMiddleware.checkId);

router.get(BASE_URL, userController.getAllUsers);

router.get(`${BASE_URL}/:id`, userController.getOneUser);

router.post(BASE_URL, userController.createOneUser);

router.patch(`${BASE_URL}/:id`, userController.updateOneUser);

router.delete(`${BASE_URL}/:id`, userController.deleteOneUser);

module.exports = router;
