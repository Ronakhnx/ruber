import { Router } from "express"
import { body } from "express-validator"
import { registerUser, loginUser } from "../controllers/user.controllers.js"
const router = Router()

router.post(
  "/register-user",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
)

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have at least 6 characters"),
  ],
  loginUser
)

export default router
