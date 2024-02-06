const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const { checkToken } = require("../../config/checkToken");

// POST /api/users

//* signup
router.post("/", usersCtrl.create);

//* login
router.post("/login", usersCtrl.login);

router.get("/all", usersCtrl.index);

//* get user data, protected routes
router.get("/profile", checkToken, usersCtrl.readProfile);
router.patch("/profile", usersCtrl.updatePostal);

module.exports = router;
