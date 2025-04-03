import express from "express";
import authController from "../Controllers/auth.mjs"
import authenticationCheck from "../Middleware/authentication.mjs";

const router = express.Router();

router.post("/register", authController.addUser);
router.post("/login", authController.login);
router.get("/logout", authenticationCheck, authController.logout);
router.get("/protect", authenticationCheck, authController.protect);
router.get("/me", authenticationCheck, authController.getUser);
router.patch("/update", authenticationCheck, authController.updateUser);

export default router;