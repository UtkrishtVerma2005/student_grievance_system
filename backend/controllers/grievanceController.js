const Grievance = require("../models/Grievance");

// functions
const createGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const grievance = await Grievance.create({
      title,
      description,
      category,
      user: req.user.id,
    });

    res.status(201).json(grievance);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllGrievances = async (req, res) => {
  const data = await Grievance.find({ user: req.user.id });
  res.json(data);
};

const getGrievanceById = async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
};

const updateGrievance = async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

const deleteGrievance = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

const searchGrievance = async (req, res) => {
  const { q } = req.query;
  const result = await Grievance.find({
    title: { $regex: q, $options: "i" },
  });
  res.json(result);
};

// 🔥 IMPORTANT EXPORT
module.exports = {
  createGrievance,
  getAllGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance,
};