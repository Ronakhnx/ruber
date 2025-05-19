import { app } from "./app.js  "
import { connectDB } from "./db/db.js"

const port = process.env.PORT 
connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
      });
    } catch (error) {
      console.log("server failed to connect", error);
    }
  })
  .catch((err) => {
    console.log("mongoDB connection failed !!!", err);
  });

