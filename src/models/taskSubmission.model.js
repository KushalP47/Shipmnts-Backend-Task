import { Schema, model } from "mongoose";

const taskSubmissionSchema = new Schema(
	{
		taskSubmissionStudentId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		taskId: {
			type: Schema.Types.ObjectId,
			ref: "Task",
		},
		taskSubmission: {
			type: String,
			required: true,
		},
		taskSubmissionDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

export const TaskSubmission = model("TaskSubmission", taskSubmissionSchema);
