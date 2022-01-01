import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser); // basically an API end-points
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
