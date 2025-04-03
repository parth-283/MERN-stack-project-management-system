import express from "express";
import taskController from "../Controllers/task.mjs";
import authenticationCheck from "../Middleware/authentication.mjs";

const router = express.Router();

router.post("/", authenticationCheck, taskController.addTask);
router.get("/", authenticationCheck, taskController.allTask);
router.put("/:id", authenticationCheck, taskController.updateTask);
router.delete("/:id", authenticationCheck, taskController.deleteTask);

export default router;