const express = require("express");
const { getListOfUsers, deleteUserController } = require("../controllers/adminController");
const router = express.Router();

router.get("/get-list-of-users", getListOfUsers)

router.delete("/delete-user/:id", deleteUserController)

module.exports = router;