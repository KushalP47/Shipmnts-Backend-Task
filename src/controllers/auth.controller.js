import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Teacher } from "../models/teacher.model.js";
import { Student } from "../models/student.model.js";

export class AuthController {
	async register(req, res) {
		try {
			const { userEmail, userPassword, userRole, userName } = req.body;

			// check if user already exists
			const userExists = await User.findOne({ userEmail });
			if (userExists) {
				return res
					.status(400)
					.json(new ApiResponse(400, {}, "User already exists"));
			}

			// check if userRole is valid
			if (userRole !== "student" && userRole !== "teacher") {
				return res
					.status(400)
					.json(new ApiResponse(400, {}, "Invalid userRole"));
			}

			const user = await User.create({
				userEmail,
				userPassword,
				userRole,
				userName,
			});

			const createdUser = await User.findOne({ userEmail });
			if (!createdUser) {
				return res
					.status(500)
					.json(
						new ApiResponse(
							400,
							{},
							"Something went wrong while creating user",
						),
					);
			}
			// creating teacher or student based on userRole
			if (userRole === "teacher") {
				const teacher = await Teacher.create({
					teacherId: user._id,
					teacherEmail: userEmail,
					teacherName: userName,
				});
				if (!teacher) {
					return res
						.status(500)
						.json(
							new ApiResponse(
								400,
								{},
								"Something went wrong while creating teacher",
							),
						);
				}
			} else {
				const student = await Student.create({
					studentId: user._id,
					studentEmail: userEmail,
					studentName: userName,
				});
				if (!student) {
					return res
						.status(500)
						.json(
							new ApiResponse(
								400,
								{},
								"Something went wrong while creating student",
							),
						);
				}
			}

			const accessToken = user.generateAccessToken();
			const refreshToken = user.generateRefreshToken();

			user.refreshToken = refreshToken;

			user.save({ validateBeforeSave: true });
			const options = {
				secure: true,
				httpOnly: true,
			};

			return res
				.status(200)
				.cookie("accessToken", accessToken, options)
				.cookie("refreshToken", refreshToken, options)
				.json(
					new ApiResponse(
						200,
						{
							user: user.toJSON(),
						},
						"User logged in successfully!!",
					),
				);
		} catch (error) {
			console.log(error);
			return res.status(500).json(new ApiResponse(500, error, error.message));
		}
	}

	async login(req, res) {
		try {
			const { userEmail, userPassword } = req.body;
			const user = await User.findOne({ userEmail });
			if (!user) {
				return res.status(404).json(new ApiResponse(404, {}, "User not found"));
			}
			const valid = await user.isPasswordCorrect(userPassword);
			if (!valid) {
				return res
					.status(400)
					.json(new ApiResponse(400, {}, "Invalid password"));
			}
			const accessToken = user.generateAccessToken();
			const refreshToken = user.generateRefreshToken();
			user.refreshToken = refreshToken;
			user.save({ validateBeforeSave: false });
			const options = {
				secure: true,
				httpOnly: true,
			};
			return res
				.status(200)
				.cookie("accessToken", accessToken, options)
				.json(
					new ApiResponse(
						200,
						{ user: user.toJSON },
						"User logged in successfully!!",
					),
				);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	async logout(req, res) {
		try {
			const { userEmail } = req.body;
			const user = await User.findOne({ userEmail });

			if (!user) {
				return res.status(404).json(new ApiResponse(404, {}, "User not found"));
			}
			user.refreshToken = "";

			user.save({ validateBeforeSave: false });
			return res
				.status(200)
				.clearCookie("accessToken")
				.json(new ApiResponse(200, {}, "User logged out successfully!!"));
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}
}

export const authController = new AuthController();
