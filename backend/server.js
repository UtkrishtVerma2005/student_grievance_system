const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/authRoutes"));
app.use("/api/grievances", require("./routes/grievanceRoutes"));

app.listen(5000, () => console.log("Server running"));