const express = require("express");
const { getListOfUsers } = require("../controllers/adminController");
const router = express.Router();


router.get("/get-list-of-users", getListOfUsers)

module.exports = router;