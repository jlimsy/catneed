const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");

// POST /api/users

//* signup
router.post("/", usersCtrl.create);

//* login
router.post("/login", usersCtrl.login);

//* get user data
router.get("/profile", usersCtrl.readProfile);
router.patch("/profile", usersCtrl.updatePostal);

module.exports = router;
