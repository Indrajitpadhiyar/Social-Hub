import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
