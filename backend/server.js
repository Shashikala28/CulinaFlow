import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

//import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import pantryRoutes from "./routes/pantry.js";
import recipeRoutes from "./routes/recipes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "AI Recipe Generator API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/recipes", recipeRoutes);

// Port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
