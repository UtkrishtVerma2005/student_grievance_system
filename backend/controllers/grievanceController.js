const Grievance = require("../models/Grievance");

// CREATE
exports.createGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.create(req.body);
    res.status(201).json(grievance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllGrievances = async (req, res) => {
  try {
    const data = await Grievance.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
exports.getGrievanceById = async (req, res) => {
  try {
    const data = await Grievance.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not Found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateGrievance = async (req, res) => {
  try {
    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteGrievance = async (req, res) => {
  try {
    await Grievance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH
exports.searchGrievance = async (req, res) => {
  try {
    const { title } = req.query;
    const results = await Grievance.find({
      title: { $regex: title, $options: "i" },
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};