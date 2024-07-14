const express = require("express");
const { getListOfUsers, deleteUserController, updateUserController, newDefaultUserController } = require("../controllers/adminController");
const router = express.Router();

router.get("/get-list-of-users", getListOfUsers)

router.delete("/delete-user/:id", deleteUserController)

router.put("/update-user/:id", updateUserController)

router.put("/new-user",newDefaultUserController)

module.exports = router;