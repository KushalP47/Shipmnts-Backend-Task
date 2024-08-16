import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
	try {
		console.log("req.cookies: ", req.header("Cookie"));
		const accessToken =
			req.header("Cookie")?.replace("accessToken=","") ||
			req.header("Authorization")?.replace("Bearer ", "");
		console.log("accessToken: ", accessToken);
		// if user doesn't have access tokens then send error
		if (!accessToken) {
			res
				.status(400)
				.json(new ApiResponse(400, {}, "User doesn't have access tokens"));
		}

		// verify the user by comparing the access tokens
		const decoded = await jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET,
		);

		// adding the user object in the request object
		const user = await User.findById(decoded?._id).select(
			"-userPassword -refreshToken",
		);

		if (!user) {
			res.status(400).json(new ApiResponse(400, {}, "User does not exixts!!"));
		}

		req.user = user;

		next();
	} catch (error) {
		res.status(500).json(new ApiResponse(500, {}, error.message));
	}
};
