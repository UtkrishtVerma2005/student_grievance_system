const Grievance = require("../models/Grievance");

// ================= CREATE =================
exports.createGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    const grievance = await Grievance.create({
      title,
      description,
      category,
      user: req.user.id,
    });

    res.status(201).json(grievance);
  } catch (err) {
    console.log("Create error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ALL =================
exports.getAllGrievances = async (req, res) => {
  try {
    const data = await Grievance.find({ user: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET BY ID =================
exports.getGrievanceById = async (req, res) => {
  try {
    const data = await Grievance.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
exports.updateGrievance = async (req, res) => {
  try {
    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
exports.deleteGrievance = async (req, res) => {
  try {
    await Grievance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= SEARCH =================
exports.searchGrievance = async (req, res) => {
  try {
    const { q } = req.query;

    const results = await Grievance.find({
      title: { $regex: q, $options: "i" },
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};