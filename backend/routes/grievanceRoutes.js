const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createGrievance,
  getAllGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance,
} = require("../controllers/grievanceController");

router.post("/", auth, createGrievance);
router.get("/", auth, getAllGrievances);
router.get("/search", auth, searchGrievance);
router.get("/:id", auth, getGrievanceById);
router.put("/:id", auth, updateGrievance);
router.delete("/:id", auth, deleteGrievance);

module.exports = router;