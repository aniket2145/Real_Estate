import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from './routes/listing.route.js';
import cookieParser from "cookie-parser";
import path from 'path';

dotenv.config(); 

mongoose.connect(process.env.MONGO).then(()=>{
  console.log("Connected to MongoDB");
}).catch((err)=>{
  console.log(err);
});

const __dirname=path.resolve();

const app=express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
  console.log('server is running on 3000');
 }
);

app.use('/api/user',userRouter); 
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(__dirname,'/Real_Estate/dist'))); 

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'Real_Estate','dist','index.html'));
})

//Middleware
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500; 
  const message=err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });

});

// const token = req.header('Authorization');
// if (!token) return res.status(401).json({ message: 'Unauthorized' });
// // Verify the token and set user information

// app.post('/api/user/update/:id', authenticateToken, async (req, res, next) => {
//   // Your existing code for handling user update
// });

