import { Schema, model } from "mongoose";

const teacherSchema = new Schema(
    {
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        teacherEmail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        teacherPassword: {
            type: String,
            required: true,
        },
        teacherName: {
            type: String,
            required: true,
            trim: true,
        },
        teacherClassrooms: {
            type: [Schema.Types.ObjectId],
            ref: "Classroom",
        },

    },
    { timestamps: true },
);

export const Teacher = model("Teacher", teacherSchema);