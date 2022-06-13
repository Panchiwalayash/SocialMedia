const mongoose=require('mongoose')

const MONGO_URL="mongodb://localhost:27017/SocialMedia?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo=()=>{
mongoose.connect(MONGO_URL,()=>{
    console.log("Connected to the MongoDB");
})
}

module.exports=connectToMongo