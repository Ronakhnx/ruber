import blackListedTokenModel from "../models/blacklistToken.model.js"
import { captainModel } from "../models/captain.model.js"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" })
  }
  const isBlacklistedToken = await blackListedTokenModel.findOne({
    token: token,
  })
  if (isBlacklistedToken) {
    return res.status(401).json({ message: "Unauthorized Access" })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decodedToken.id)
    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" })
  }
}
const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" })
  }
  const isBlacklistedToken = await blackListedTokenModel.findOne({
    token: token,
  })
  if (isBlacklistedToken) {
    return res.status(401).json({ message: "Unauthorized Access" })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const captain = await captainModel.findById(decodedToken.id)
    req.captain = captain
    return next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" })
  }
}
export { authUser ,authCaptain}
