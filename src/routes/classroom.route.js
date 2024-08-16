import Router from "express";
import { classroomController } from "../controllers/classroom.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyIsTeacher } from "../middleware/verifyIsTeacher.js";
const router = Router();

router.put(
	"/:classroomId",
	verifyJWT,
	verifyIsTeacher,
	classroomController.updateClassroom,
);
router.delete(
	"/:classroomId",
	verifyJWT,
	verifyIsTeacher,
	classroomController.deleteClassroom,
);

router.post(
	"/:classroomId/student",
	verifyJWT,
	verifyIsTeacher,
	classroomController.addStudentToClassroom,
);

router.delete(
	"/:classroomId/student/:studentId",
	verifyJWT,
	verifyIsTeacher,
	classroomController.removeStudentFromClassroom,
);



export default router;
