const express = require("express");
const {accessChat} = require("../controllers/CommunciationController");

const router = express.Router();

router.route("/livechat").post(accessChat);

module.exports = router;
