import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
dotenv.config();

//rest object
const app = express();

// parsing JSON (middleware) - takes Json as input from request body and returns a promise that returns a JS object ; WHy JSON ? because data is transfered over the web in this format

app.use(cors());
app.use(express.json());

//database connection
connectDb();
//rest api

// router middleware
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("<h1> Welcome to Ecommerce website</h1>");
});

//PORT
const port = process.env.PORT || 8080;

//run listen
app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
