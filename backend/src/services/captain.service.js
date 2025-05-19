import { captainModel } from "../models/captain.model"

const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  plate,
  color,
  capacity,
  vehicleType,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !capacity ||
    !vehicleType ||
    !plate
  ) {
    throw new Error("All fields are required !")
  }
  const captain = await captainModel.create({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  })
  return captain
}

export { createCaptain }
