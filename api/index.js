import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";

// 1. Load Environment Variables
dotenv.config();

// 2. Database Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

const app = express();

// 3. Middlewares
app.use(express.json());

// 4. Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// 5. Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Fixed: 'return' and 'res' must be together to avoid returning 'undefined'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 6. Server Initialization
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
