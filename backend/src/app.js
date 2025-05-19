import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
  res.send("Welcome to the home page")
})
app.use("/user", userRoutes)
app.use("captain", captainRoutes)
export { app }
