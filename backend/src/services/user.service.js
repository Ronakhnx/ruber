import { asyncHandler } from "../utils/asyncHandler.js"
import { userModel } from "../models/user.model.js"

const createUser = asyncHandler((req, res) => {
  firstName, lastName, email, password
  if (!firstName || lastName || email || password) {
    throw new Error("All fields are required!")
  }
  const user = userModel.create({
    fullName: { firstName, lastName },
    email,
    password,
  })
  return user
})

export default createUser
