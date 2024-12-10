import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "../routes/users.js";
import auth from "../routes/auth.js";
import posts from "../routes/posts.js";

const app = express();

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect(mongoDB);
}

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/users", router);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

// Export the app for serverless function
export default app;
