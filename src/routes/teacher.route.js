import Router from "express";
import { teacherController } from "../controllers/teacher.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyIsTeacher } from "../middleware/verifyIsTeacher.js";
import { classroomController } from "../controllers/classroomController.js";

const router = Router();

router.post("/:teacherId/classroom", verifyJWT, verifyIsTeacher, classroomController.createClassroom);
router.get("/:teacherId/classrooms", verifyJWT, verifyIsTeacher, classroomController.getClassrooms);
