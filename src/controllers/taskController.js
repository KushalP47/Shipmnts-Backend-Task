import { Task } from "../models/task.model";
import { Classroom } from "../models/classroom.model";
import { ApiResponse } from "../helpers/apiResponse";

export class TaskController {
	async getTaskSubmissions(req, res) {
		try {
			const { taskId } = req.params;
			const task = await Task.findById(taskId);
			if (!task) {
				return res.status(404).json(new ApiResponse(404, {}, "Task not found"));
			}
			const taskSubmissions = await TaskSubmission.find({
				_id: { $in: task.taskSubmissions },
			});
			res
				.status(200)
				.json(new ApiResponse(200, { taskSubmissions }, "Task found"));
		} catch (error) {
			res.status(500).json(new ApiResponse(500, {}, error.message));
		}
	}
}

export const taskController = new TaskController();
