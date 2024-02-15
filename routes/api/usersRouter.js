const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const { checkToken } = require("../../config/checkToken");
const { checkAdmin } = require("../../config/checkAdmin");

// POST /api/users

// ===== PUBLIC ROUTES ===== //

router.post("/", usersCtrl.create); //* signup
router.post("/login", usersCtrl.login); //* login

// ===== PROTECTED ROUTES ===== //
router.get("/profile", checkToken, usersCtrl.readProfile);
router.patch("/profile", checkToken, usersCtrl.updatePostal);

//* ===== CHAT ====== //
router.get("/chat", checkToken, usersCtrl.getChats);

//! admin-access only
//? if all admins view the same thing, do i still need a checkToken?
router.get("/all", checkToken, checkAdmin, usersCtrl.index); //view all users

module.exports = router;
