exports.createGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // 🔍 check user
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const grievance = await Grievance.create({
      title,
      description,
      category,
      user: req.user.id
    });

    res.status(201).json(grievance);

  } catch (err) {
    console.log("Create error:", err);
    res.status(500).json({ message: "Server error" });
  }
};