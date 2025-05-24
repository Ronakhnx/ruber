import userModel from "../models/user.model.js"
import { validationResult } from "express-validator"
import { createUser } from "../services/user.service.js"
import { blackListedTokenModel } from "../models/blacklistToken.model.js"

const registerUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { fullname, email, password } = req.body
  const isUseExist = await userModel.findOne({ email })
  if (isUseExist) {
    return res.status(400).json({ message: "User already exist!" })
  }
  const hashedPassword = await userModel.hashPassword(password)

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email: email,
    password: hashedPassword,
  })

  const token = await user.generateAuthToken()
  return res.status(201).json({ token, user })
}

const loginUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const user = await userModel.findOne({ email }).select("+password")

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" })
  }

  const isMatched = await user.comparePassword(password)
  if (!isMatched) {
    return res.status(401).json({ message: "Invalid email or password" })
  }
  const token = await user.generateAuthToken()
  res.cookie("token", token)
  return res.status(200).json({ token, user })
}

const getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user)
}

const logoutUser = async (req, res, next) => {
  res.clearCookie("token")
  const token = req.cookies.token || req.headers.authorization.split(" ")[1]
  await blackListedTokenModel.create({ token })
  return res.status(200).json({ message: "Logged out" })
}

export { registerUser, loginUser, getUserProfile, logoutUser }
