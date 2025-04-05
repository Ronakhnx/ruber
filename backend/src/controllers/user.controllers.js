import { validationResult } from "express-validator"
import { userModel } from "../models/user.model.js"
import userService from "../services/user.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { firstName, lastName, email, password } = req.body

  const hashPassword = await userModel.hashaPassword(password)

  const user = await userService.createUser({
    firstName,
    lastName,
    email,
    password: hashPassword,
  })
  const token = user.generateAuthToken()
  res.status(200).json({ user, token })
})

export { registerUser }
