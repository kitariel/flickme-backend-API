var express = require("express");
var router = express.Router();
const cors = require("cors");

router.use(cors());

const userController = require("../controllers/users-controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/createUsers", userController.apiCreateUsers);

router.get("/users", userController.apiGetUsers);

module.exports = router;
