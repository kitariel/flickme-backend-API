var express = require("express");
var router = express.Router();
const cors = require("cors");

router.use(cors());

const userController = require("../controllers/users-controller");

/* GET home page. */

router.post("/createUsers", userController.apiCreate);
router.post("/updateUser", userController.apiUpdateUser);

router.get("/userInfo", userController.apiUserGet);
router.get("/userAll", userController.apiGetAll);

router.delete("/userDeleteById", userController.apiUserDelete);

router.get("/apiUserChecker", userController.apiUserChecker);

router.post("/login", userController.apiLogin);

module.exports = router;
