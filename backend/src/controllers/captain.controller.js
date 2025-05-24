import { validationResult } from "express-validator"
import { captainModel } from "../models/captain.model.js"
import { createCaptain } from "../services/captain.service.js"
import { blackListedTokenModel } from "../models/blacklistToken.model.js"

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const hashedPassword = await captainModel.hashPassword(password)
  const { fullName, vehicle, email, password } = req.body
  const isCaptainExist = await captainModel.findOne({ email })
  if (isCaptainExist) {
    return res.status(400).json({ message: "Captain already exist!" })
  }
  const captain = await createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  })

  const token = captainModel.generateAuthToken()
  res.status(201).json({ token, captain })
}

const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const captain = await userModel.findOne({ email }).select("+password")

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" })
  }

  const isMatched = await captain.comparePassword(password)
  if (!isMatched) {
    return res.status(401).json({ message: "Invalid email or password" })
  }
  const token = await captain.generateAuthToken()
  res.cookie("token", token)
  return res.status(200).json({ token, captain })
}

const getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain)
}

const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token")
  const token = req.cookies.token || req.headers.authorization.split(" ")[1]
  await blackListedTokenModel.create({ token })
  return res.status(200).json({ message: "Logged out" })
}

export { registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile }
