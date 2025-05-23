import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
})

userSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  })
  return token
}
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10)
}
export const userModel = mongoose.model("ruber_users", userSchema)
export default userModel
