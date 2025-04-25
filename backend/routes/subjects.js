const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  handleAllSubjects,
  handleNewSubject,
  handleUpdateAttendance,
  handleUpdateSubject,
  handleDeleteSubject,
} = require("../controllers/handleSub");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  console.log("Received Token in Backend:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

router.post("/", auth, handleNewSubject);

router.get("/", auth, handleAllSubjects);

router.put("/:id", auth, handleUpdateAttendance);

router.put("/update/:id", auth, handleUpdateSubject);

router.delete("/delete/:id", auth, handleDeleteSubject);

module.exports = router;
