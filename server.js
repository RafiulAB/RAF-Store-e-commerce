import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

//DOTENV Configure sothat we can use env.
dotenv.config();
//database connect
connectDB();
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1> Welcome to E-commerce APP</h1>");
});

//port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
