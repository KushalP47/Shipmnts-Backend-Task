import { Classroom } from "../models/classroom.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import { Student } from "../models/student.model.js";
import { Task } from "../models/task.model.js";

export class ClassroomController {
	createClassroom = async (req, res) => {
		try {
			const { classroomName } = req.body;

			const classroom = await Classroom.create({
				classroomName,
				classroomTeacherId: req.user._id,
			});

			if (!classroom) {
				return res
					.status(500)
					.json(
						new ApiResponse(
							400,
							{},
							"Something went wrong while creating classroom",
						),
					);
			}

			const teacher = await Teacher.findOne({ teacherId: req.user._id });
			teacher.teacherClassrooms.push(classroom._id);
			await teacher.save();

			res
				.status(200)
				.json(
					new ApiResponse(200, { classroom }, "Classroom created successfully"),
				);
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	};

	updateClassroom = async (req, res) => {
		try {
			const { classroomId } = req.params;
			const { classroomName } = req.body;

			if (!classroomName) {
				return res
					.status(400)
					.json(new ApiResponse(400, {}, "Classroom name is required"));
			}
			const classroomExists = await Classroom.findById(classroomId);
			if (!classroomExists) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Classroom not found"));
			}

			if (
				classroomExists.classroomTeacherId.toString() !==
				req.user._id.toString()
			) {
				return res
					.status(403)
					.json(
						new ApiResponse(
							403,
							{},
							"You are not authorized to update this classroom",
						),
					);
			}

			const classroom = await Classroom.findByIdAndUpdate(
				classroomId,
				{ classroomName },
				{ new: true },
			);

			if (!classroom) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Classroom not found"));
			}

			res
				.status(200)
				.json(
					new ApiResponse(200, { classroom }, "Classroom updated successfully"),
				);
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	};

	deleteClassroom = async (req, res) => {
		try {
			const { classroomId } = req.params;
			const classroom = await Classroom.findById(classroomId);

			if (!classroom) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Classroom not found"));
			}

			if (classroom.classroomTeacherId.toString() !== req.user._id.toString()) {
				return res
					.status(403)
					.json(
						new ApiResponse(
							403,
							{},
							"You are not authorized to delete this classroom",
						),
					);
			}

			await Classroom.findByIdAndDelete(classroomId);

			res
				.status(200)
				.json(new ApiResponse(200, {}, "Classroom deleted successfully"));
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	};

	getClassrooms = async (req, res) => {
		try {
			const classrooms = await Classroom.find({
				classroomTeacherId: req.user._id,
			});

			res
				.status(200)
				.json(
					new ApiResponse(
						200,
						{ classrooms },
						"Classrooms fetched successfully",
					),
				);
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	};

	addStudentToClassroom = async (req, res) => {
		try {
			const { classroomId } = req.params;
			const { studentId } = req.body;

			const classroom = await Classroom.findById(classroomId);
			if (!classroom) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Classroom not found"));
			}

			if (classroom.classroomTeacherId.toString() !== req.user._id.toString()) {
				return res
					.status(403)
					.json(
						new ApiResponse(
							403,
							{},
							"You are not authorized to add student to this classroom",
						),
					);
			}

			classroom.classroomStudents.push(studentId);
			await classroom.save();

			const student = await Student.findById(student);
			if (!student) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Student not found"));
			}
			student.studentClassrooms.push(classroomId);
			await student.save();

			res
				.status(200)
				.json(new ApiResponse(200, "Student added to classroom successfully"));
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	};

	removeStudentFromClassroom = async (req, res) => {
		try {
			const { classroomId, studentId } = req.params;

			const classroom = await Classroom.findById(classroomId);
			if (!classroom) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Classroom not found"));
			}

			if (classroom.classroomTeacherId.toString() !== req.user._id.toString()) {
				return res
					.status(403)
					.json(
						new ApiResponse(
							403,
							{},
							"You are not authorized to remove student from this classroom",
						),
					);
			}
			const student = await Student.findById(studentId);
			if (!student) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Student not found"));
			}

			const studentIndex = classroom.classroomStudents.findIndex(
				(student) => student.toString() === studentId,
			);
			if (studentIndex === -1) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Student not found in classroom"));
			}

			classroom.classroomStudents = classroom.classroomStudents.filter(
				(student) => student.toString() !== studentId,
			);
			await classroom.save();

			student.studentClassrooms = student.studentClassrooms.filter(
				(classroom) => classroom.toString() !== classroomId,
			);
			await student.save();

			res
				.status(200)
				.json(
					new ApiResponse(200, "Student removed from classroom successfully"),
				);
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	};

	addTaskToClassroom = async (req, res) => {
		try {
			const { classroomId } = req.params;
			const { title, description, dueDate } = req.body;
			const classroom = await Classroom.findById(classroomId);
			if (!classroom) {
				return res
					.status(404)
					.json(new ApiResponse(404, {}, "Classroom not found"));
			}

			if (classroom.classroomTeacherId.toString() !== req.user._id.toString()) {
				return res
					.status(403)
					.json(
						new ApiResponse(
							403,
							{},
							"You are not authorized to add task to this classroom",
						),
					);
			}

			const task = await Task.create({
				taskTitle: title,
				taskDescription: description,
				taskDueDate: dueDate,
				taskClassroom: classroomId,
			});

			if (!task) {
				return res
					.status(500)
					.json(
						new ApiResponse(
							400,
							{},
							"Something went wrong while creating task",
						),
					);
			}

			classroom.classroomTasks.push(task._id);
			await classroom.save();

			res
				.status(200)
				.json(
					new ApiResponse(
						200,
						{ task },
						"Task added to classroom successfully",
					),
				);
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	};

    
}

export const classroomController = new ClassroomController();
