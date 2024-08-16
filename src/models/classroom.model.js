import { Schema, model } from "mongoose";

const classroomSchema = new Schema(
	{
		classroomName: {
			type: String,
			required: true,
			trim: true,
		},
		classroomTeacherId: {
			type: Schema.Types.ObjectId,
			ref: "Teacher",
		},
		classroomStudents: {
			type: [Schema.Types.ObjectId],
			ref: "Student",
		},
		classroomTasks: {
			type: [Schema.Types.ObjectId],
			ref: "Task",
		},
	},
	{ timestamps: true },
);

export const Classroom = model("Classroom", classroomSchema);
