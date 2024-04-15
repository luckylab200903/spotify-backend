const express = require("express");
const app = express();
const connectDB=require("./config/connectDB")
const PORT = process.env.PORT || 5000;
const dotenv=require("dotenv")
const userRoutes=require("./routes/userRoutes")
const jwtpassport=require("./config/jwtpassportauth")
const songRoutes=require("./routes/songRoutes")
const playlistRoutes=require("./routes/playlistRoutes")
const cors=require("cors")
dotenv.config()
jwtpassport()
app.use(cors())
app.use(express.json())
app.use("/api",userRoutes)
app.use("/api",songRoutes)
app.use("/api",playlistRoutes)
app.get("/",(req,res)=>{
  res.send("hello world")
})
try {
  app.listen(5000, () => {
    console.log(`Listening on port ${5000}`)
    connectDB(process.env.MONGO_URL)
  });
} catch (error) {
    console.log(error);
}
