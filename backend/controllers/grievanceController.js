exports.createGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    // ❌ proper check
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // ❌ validation
    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields required" });
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
    res.status(500).json({ message: err.message });
  }
};