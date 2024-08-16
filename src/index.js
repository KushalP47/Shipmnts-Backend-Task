import app from "./config/app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({
	// configure dotenv
	path: "./.env", // set path of env
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});

connectDB();
