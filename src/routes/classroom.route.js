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
