import { Schema, model } from "mongoose";

const studentSchema = new Schema(
	{
		studentId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		studentName: {
			type: String,
			required: true,
			trim: true,
		},
		studentEmail: {
			type: String,
			required: true,
			trim: true,
		},
		studentPassword: {
			type: String,
			required: true,
		},
		studentClassrooms: {
			type: [Schema.Types.ObjectId],
			ref: "Classroom",
		},
		studentTaskSubmissions: {
			type: [Schema.Types.ObjectId],
			ref: "TaskSubmission",
		},
	},
	{ timestamps: true },
);

export const Student = model("Student", studentSchema);
