import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import Listing from "./Listing";
import ShowListing from "../Components/ShowListing";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);
  //console.log(saleListings);
  //console.log(rentListings);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 px-3 py-28 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
          Simplify your <span className="text-slate-500">search</span> and{" "}
          <span className="text-slate-500">find </span>
          <br></br>your next dream home.
        </h1>
        <div className="text-gray-500 text-sm sm:text-sm ">
          "Discover your next dream home at TheReal Estate,<br></br> your
          ultimate destination for finding the perfect place to live."
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-600 hover:underline"
        >
          Let's Explore...
        </Link>
      </div>
      {/* Swiper */}
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => {
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>;
          })}
      </Swiper> */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                  // height: "500px", // Set height
                  // width: "auto", // Set width
                }}
                className="h-[650px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* offer listings */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 pl-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h1 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h1>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ShowListing listing={listing} key={listing._id}></ShowListing>
              ))}
            </div>
          </div>
        )}

        {/* rent listings */}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h1 className="text-2xl font-semibold text-slate-600">
                Recent listings for rent
              </h1>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more listings for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ShowListing listing={listing} key={listing._id}></ShowListing>
              ))}
            </div>
          </div>
        )}

        {/* sale listings */}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h1 className="text-2xl font-semibold text-slate-600">
                Recent listings for sale
              </h1>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sell"}
              >
                Show more listings for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ShowListing listing={listing} key={listing._id}></ShowListing>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
