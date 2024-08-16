import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Welcome to the server");
});

import authRouter from "../routes/auth.route.js";
app.use("/api/v1/auth", authRouter);

export default app;
