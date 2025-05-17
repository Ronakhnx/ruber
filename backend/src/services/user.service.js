import { userModel } from "../models/user.model.js"

const createUser = async ({ firstName, lastName, email, password }) => {
  // Check if user with this email already exists
  const existingUser = await userModel.findOne({ email })
  if (existingUser) {
    throw new Error("Email already registered")
  }

 
  const user = await userModel.create({
    fullName: {
      firstName,
      lastName: lastName || "", // Make lastName optional
    },
    email,
    password,
  })

  return user
}

export { createUser }
