import { Router } from "express"
import { body } from "express-validator"
import { registerUser } from "../controllers/user.controllers.js"
const router = Router()

router.post(
  "/register-user",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name should has 3 charaacters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have atleast 6 characters"),
  ],
  registerUser
)
export default router
