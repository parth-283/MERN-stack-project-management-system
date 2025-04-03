import express from "express";
import projectController from "../Controllers/project.mjs";
import authenticationCheck from "../Middleware/authentication.mjs";

const router = express.Router();

router.post("/", authenticationCheck, projectController.addProject);
router.get("/", authenticationCheck, projectController.allProjects);
router.get("/:id", authenticationCheck, projectController.getProjectsByTask);
router.put("/:id", authenticationCheck, projectController.updateProject);
router.delete("/:id", authenticationCheck, projectController.deleteProject);

export default router;