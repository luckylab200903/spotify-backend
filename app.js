const express = require("express");
const app = express();
const connectDB=require("./config/connectDB")
const PORT = process.env.PORT || 5000;
const fs=require("fs")
const https=require("https")
const key=fs.readFileSync("private.key")
const certificate=fs.readFileSync("certificate.crt")
const dotenv=require("dotenv")
const userRoutes=require("./routes/userRoutes")
const jwtpassport=require("./config/jwtpassportauth")
const songRoutes=require("./routes/songRoutes")
const playlistRoutes=require("./routes/playlistRoutes")
const cred={
  key,certificate
}
const cors=require("cors")
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
// app.get("/.well-known/pki-validation/6320BFAC2BB0E297C8D6E60A932C5B09.txt", (req, res) => {
//   const filePath = path.join(__dirname, "6320BFAC2BB0E297C8D6E60A932C5B09.txt");
//   res.sendFile(filePath);
// });
try {
  app.listen(5000, () => {
    console.log(`Listening on port ${5000}`)
    connectDB(process.env.MONGO_URL)
  });
} catch (error) {
    console.log(error);
}


const httpsserver=https.createServer(cred,app);
httpsserver.listen(8443)
