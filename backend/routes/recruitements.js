const express = require("express");
const router = express.Router();

const { recruitment } = require("../controllers");

router.get("/", recruitment.getJobPositions);
router.get("/:id", recruitment.getDetailPosition);

module.exports = router;
