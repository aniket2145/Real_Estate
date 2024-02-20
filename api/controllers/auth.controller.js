import User from "../models/userModule.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
import jwt from 'jsonwebtoken';


//sign-up authentication
export const signup=async (req,res,next)=>{
  const {username,email,password}=req.body;
  const hashedpassword = bcryptjs.hashSync(password,10)
  const newUser = new User({username,email,password:hashedpassword});
  try{
  await newUser.save();
  res.status(201).json('user created successfully!'); 
  }
  catch(error){
    next(error);
  }

};
// sign-in authentication
export const signin=async(req,res,next)=>{
  const { email, password}=req.body;
  try {
    const validUser=await User.findOne({email});
    if(!validUser) return next(errorHandler(404,'User not found!'));
    
    const validPassword=bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401,'Wrong Credentials!'));

    const token=jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const {password: pass, ...rest}= validUser._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
  } catch (error) {
    next(error); 
  }
};

export const google=async(req,res,next)=>{
  try {
    const user=await User.findOne({ email: req.body.email })
    if(user){
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      const { password: pss, ...rest }=user._doc;
      res
      .cookie('access_token',token,{httpOnly:true})
      .status(200)
      .json(rest);
    }else{
      const generatedpassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashedpassword=bcryptjs.hashSync(generatedpassword,10);
      const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4), 
      email:req.body.email,
      password:hashedpassword,
      avatar: req.body.photo
      });
      await newUser.save();
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {password:pass, ...rest}=newUser._doc;
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        
    }
  } catch (error) {
    next(error);
  }
}

// signOut 

export const signOut=async(req,res,next)=>{
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
}