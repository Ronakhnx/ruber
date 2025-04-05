import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be atleast 3 characters."],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last name must be atleast 3 characters."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: [5, "email must be atleast 5 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
  },
})
userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
  return token
}

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashaPassword = async (password)=>{
  return await bcrypt.hash(password,10)
}
export const userModel = mongoose.model("ruber_user", userSchema)
