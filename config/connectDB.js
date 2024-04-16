const mongoose=require("mongoose")

const connectDB=(URL)=>{
    mongoose.connect("mongodb+srv://spotify-clone:spotify-clone@spotify-clone.c4a8mfr.mongodb.net/database").then(()=>{
        console.log("Sucessfully connected to the databse");
    }).catch((error)=>{
        console.log("error occured in connecting the database")
    })
}

module.exports= connectDB;
