import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

export default function ShowListing({ listing }) {
  if (!listing || (!listing.discountprice && !listing.regularprice)) {
    return null;
  }
  return (
    <div className="bg-white hover:shadow-lg transition-shadow overflow-hidden shadow-md rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3">
          <p className="text-lg font-semibold truncate text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700 "></MdLocationOn>
            <p className="w-full text-sm text-gray-600 truncate ">
              {listing.address}
            </p>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            ₹{" "}
            {listing.offer
              ? listing.discountprice.toLocaleString("en-IN")
              : listing.regularprice.toLocaleString("en-IN")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-x5">
              {/* <FaBed className="text-lg flex" /> */}
              {listing.bedrooms > 1
                ? `${listing.bedrooms}
              beds`
                : `${listing.bedrooms} bed`}
            </div>
            {/* <FaBath className="text-lg" /> */}
            <div className="font-bold text-x5">
              {listing.bathrooms > 1
                ? `${listing.bathrooms}
              baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
