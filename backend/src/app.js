import express from "express"
import userRoutes from "./routes/user.routes.js"
const app = express()

app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/user", userRoutes)
export { app }
