import Router from "express";
import { classroomController } from "../controllers/classroom.controller.js";
import { taskController } from "../controllers/task.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyIsTeacher } from "../middleware/verifyIsTeacher.js";
const router = Router();

// update classroom
router.put(
	"/:classroomId",
	verifyJWT,
	verifyIsTeacher,
	classroomController.updateClassroom,
);
// delete classrooms
router.delete(
	"/:classroomId",
	verifyJWT,
	verifyIsTeacher,
	classroomController.deleteClassroom,
);

// add student to classroom
router.post(
	"/:classroomId/student",
	verifyJWT,
	verifyIsTeacher,
	classroomController.addStudentToClassroom,
);

// remove student from classroom
router.delete(
	"/:classroomId/student/:studentId",
	verifyJWT,
	verifyIsTeacher,
	classroomController.removeStudentFromClassroom,
);

// add task to classroom
router.post(
	"/:classroomId/task",
	verifyJWT,
	verifyIsTeacher,
	classroomController.addTaskToClassroom,
);

// get tasks submission status
router.get(
	"/:classroomId/task/:taskId/submissions",
	verifyJWT,
	verifyIsTeacher,
	taskController.getTaskSubmissions,
);

export default router;
