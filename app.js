const express = require("express");
const app = express();
const connectDB=require("./config/connectDB")
const PORT = process.env.PORT || 5000;
const fs=require("fs")
const https=require("https")
const file=fs.readFileSync("./6320BFAC2BB0E297C8D6E60A932C5B09.txt")
const dotenv=require("dotenv")
const key=fs.readFileSync("private.key")
const cert=fs.readFileSync("certificate.crt")
console.log(key);
const userRoutes=require("./routes/userRoutes")
const jwtpassport=require("./config/jwtpassportauth")
const songRoutes=require("./routes/songRoutes")
const playlistRoutes=require("./routes/playlistRoutes")
const cors=require("cors")
const cred={
  key,cert
}
dotenv.config()
jwtpassport()
app.use(cors())
app.use(express.json())
app.use("/api",userRoutes)
app.use("/api",songRoutes)
app.use("/api",playlistRoutes)
app.get("/api",(req,res)=>{
  res.send("hello world")
})
app.get("/.well-known/pki-validation/6320BFAC2BB0E297C8D6E60A932C5B09.txt",(req,res)=>{
  res.sendFile("C:/Users/KESHAV KUMAR SINGH/Desktop/intern/spotify-back/6320BFAC2BB0E297C8D6E60A932C5B09.txt")
})

try {
  app.listen(5000, () => {
    console.log(`Listening on port ${5000}`)
    connectDB(process.env.MONGO_URL)
  });
} catch (error) {
    console.log(error);
}


const httpsserver=https.createServer(cred,app)
httpsserver.listen(8443)