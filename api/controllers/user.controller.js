import { errorHandler } from "../Utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/userModule.js";
import Listing from "../models/listing.model.js";

export const test=(req,res)=>{
  res.json({
    message:'Api Route is working!',
  });
};

//user Update Functionality
export const updateUser=async(req,res,next)=>{
  if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your won account'));
  try {
    if(req.body.password){
      req.body.password=bcryptjs.hashSync(req.body.password,10);
    }
    const updatedUser= await User.findByIdAndUpdate(req.params.id,{
      $set:{
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
    );
    const { password, ...rest}=updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
 
};

//user Delete Functionality
export const deleteUser=async (req,res,next)=>{
  if(req.user.id !== req.params.id)
  return next(errorHandler(401, 'You can only delete your own account!'));
try {
  await User.findByIdAndUpdate(req.params.id);
  res.clearCookie('access_token');
  res.status(200).json('User has been deleted!');
} catch (error) {
  next(error);
} 
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      //console.log('Listings:', listings);
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
   // return next(errorHandler(401, 'You can only view your own listings!'));
   return next({ statusCode: 401, message: 'You can only view your own listings!' });

  }
};

 
export const getUser=async (req,res,next)=>{
  try {
    const user=await User.findById(req.params.id);

    if(!user)return next(errorHandler(404,'User not found!'));
    const{password:pass,...rest}=user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}



// export const getUserListing= async(req,res,next)=>{
//   if(req.user.id === req.params.id)
//   {
//     try {
//    // const listings=await Listing.findOne({userRef:ReferenceError.params.id});
//    const listings = await Listing.findOne({ userRef: req.params.id });

//     res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// } else{
//   return next(errorHandler(401, 'You can only view your own listings!'));
// }
// };

