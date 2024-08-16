import { Schema, model } from "mongoose";

const taskSchema = new Schema(
	{
		taskTitle: {
			type: String,
			required: true,
			trim: true,
		},
		taskDescription: {
			type: String,
			required: true,
			trim: true,
		},
		taskDueDate: {
			type: Date,
			required: true,
		},
		taskClassroom: {
			type: Schema.Types.ObjectId,
			ref: "Classroom",
		},
		taskSubmissions: {
			type: [Schema.Types.ObjectId],
			ref: "TaskSubmission",
		},
	},
	{ timestamps: true },
);

export const Task = model("Task", taskSchema);
