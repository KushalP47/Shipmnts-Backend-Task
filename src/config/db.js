import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
	// configure dotenv
	path: "../../.env", // set path of env
});

const connectDB = async () => {
	try {
		// connecting with the Database through atlas via mongoose.connect() method
		const mongoURI = process.env.MONGODB_URI;
		if (!mongoURI) {
			throw new Error(
				"MONGODB_URI is not defined in the environment variables",
			);
		}
		const connectionInstance = await mongoose.connect(mongoURI);
		console.log(
			`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`,
		);
	} catch (error) {
		// Error Handling
		console.error("MongoDB Connection Error:  ", error);
		process.exit(1);
	}
};

export default connectDB;
