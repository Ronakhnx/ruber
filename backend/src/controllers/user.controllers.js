import { validationResult } from "express-validator"
import { userModel } from "../models/user.model.js"
import { createUser } from "../services/user.service.js"

const registerUser = async (req, res) => {
  console.log(req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { fullName, email, password } = req.body

  const isUserAlready = await userModel.findOne({ email })

  if (isUserAlready) {
    return res.status(400).json({ message: "User already exist" })
  }

  const hashedPassword = await userModel.hashPassword(password)

  const user = await createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  })

  const token = await user.generateAuthToken()

  res.status(201).json({ token, user })
}

const loginUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const user = await userModel.findOne({ email }).select("password")

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" })
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" })
  }

  const token = await user.generateAuthToken()
  if (!token) {
    res.status(200).json({ token, user })
  }
}
export { registerUser, loginUser }
