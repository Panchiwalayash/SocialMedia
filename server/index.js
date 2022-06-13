const express=require('express');
const app=express();
const port=5000;
const helmet=require('helmet');
const morgan=require('morgan');
const connectToMongo = require('./db');
const multer=require('multer');
const path=require("path")


connectToMongo();

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use('/api/auth2',require('./routes/auth'))
app.use('/api/user2',require('./routes/user'))
app.use('/api/post2',require('./routes/post'))



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})