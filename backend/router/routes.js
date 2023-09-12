const express = require("express");
const router = express.Router();
const { runCode } = require("../controller/runCodeController");

router.get("/", (req, res) => {
  res.json({ online: "complier" });
});
router.post("/run", runCode);

module.exports = router;
