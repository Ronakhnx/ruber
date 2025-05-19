import mongoose from "mongoose"

const captainSchema = new mongoose.Schema({
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
    minLength: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate must be at least 3 characters long"],
    },
    capacty: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
    },
    location: {
      lat: { type: Number },
      long: { type: Number },
    },
  },
})

captainSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    return token
  }
  captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }
  
  captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
  }
export const captainModel = mongoose.model("ruber_captain", captainSchema)
