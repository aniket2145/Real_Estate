// import mongoose from "mongoose";
// const ListingSchema=new mongoose.Schema(
//   {
//     name:{
//       type:String,
//       required:true,
//     },
//     description:{
//       type:String,
//       required:true,
//     },
//     address:{
//       type:String,
//       required:true,
//     },
//     regularPrice:{
//       type:Number,
//       required:true,
//     },
//     discountPrice:{
//       type:Number,
//       required:true,
//     },
//     bathrooms:{
//       type:Number,
//       required:true,
//     },
//     bedrooms:{
//       type:Number,
//       required:true,
//     },
//     furnished:{
//       type:Boolean,
//       required:true,
//     },
//     parking:{
//       type:Boolean,
//       required:true,
//     },
//     type:{
//       type:String,
//       required:Boolean,
//     },
//     offer:{
//       type:Boolean,
//       required:true,
//     },
//     imageUrl:{
//       type:Array,
//       required:true,
//     },
//     userRef:{
//       type:String,
//       required:true,
//     },
//   },{timestamps:true}
// )

// const Listing=mongoose.model('Listing',ListingSchema);

// export default Listing;


import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularprice: {
      type: String,
      required: true,
    },
    discountprice: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String, // Assuming 'type' is a string
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {  // Corrected field name
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', ListingSchema);

export default Listing;
