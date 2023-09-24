const express = require("express");
const router = express.Router();
const { runCode } = require("../controller/runCodeController");
const { registerUser, authUser } = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login",authUser);
router.get("/", (req, res) => {
  res.json({ online: "complier" });
});

router.post("/run", runCode);

module.exports = router;
