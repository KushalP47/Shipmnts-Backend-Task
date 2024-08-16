import { ApiResponse } from "../utils/ApiResponse";
import { Teacher } from "../models/teacher.model";

export const verifyIsTeacher = async (req, res, next) => {
	try {
		if (!req.user) {
			return res
				.status(403)
				.json(new ApiResponse(403, {}, "User is not a verified"));
		}
		const teacher = await Teacher.findOne({ teacherId: req.user._id });
		if (!teacher) {
			return res
				.status(403)
				.json(new ApiResponse(403, {}, "User is not a teacher"));
		}
		next();
	} catch (error) {
		res.status(500).json(new ApiResponse(500, {}, error.message));
	}
};
