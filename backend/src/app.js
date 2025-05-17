import express from "express"
import userRouter from "./routes/user.routes.js"
const app = express()
import cors from "cors"

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/user", userRouter)


export { app }
