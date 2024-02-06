const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");

// POST /api/users

//* signup
router.post("/", usersCtrl.create);

//* login
const { checkToken } = require("../../config/checkToken");
router.post("/login", usersCtrl.login);

//* get user data, protected routes
router.get("/profile", checkToken, usersCtrl.readProfile);
router.patch("/profile", usersCtrl.updatePostal);

module.exports = router;
