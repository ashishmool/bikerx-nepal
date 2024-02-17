import * as React from 'react';
import { useState, useEffect } from 'react';
import {Link, Outlet, useParams} from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaRegCalendar, FaRegBookmark, FaRegTrashCan, FaChevronRight } from 'react-icons/fa';
import { Spinner } from '../ui/Spinner';
import { WrongPage } from './WrongPage';
import {NavLinkTour} from "../ui/NavLinkTour.tsx";
import {StarRating} from "../ui/StarRating.tsx";

export const SpecificTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tour/getById/${id}`);
        setTour(response.data);
        console.log("Response",response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchTourById();
    }
  }, [id]);

  if (loading) {
    return (
        <main className="relative pt-32 px-[8%]">
          <Spinner />
        </main>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tour) {
    return <WrongPage />;
  }

  return (
      <main className="relative pt-32">
        <div className="flex text-[--secundary-color] gap-5 px-[8%] flex-col laptop:flex-row justify-between">
        <span className="gap-2">
          Tours <FaChevronRight className="scale-[0.7] inline-block" />{' '}
          <span className="text-white">{tour.title}</span>
        </span>
          <Link
              to="/tours"
              className="border-b border-white/40 transition duration-200 hover:text-white flex items-center gap-2
          w-fit cursor-pointer"
          >
            <FaArrowLeft />
            Get back
          </Link>
        </div>
        <div className="grid grid-cols-1 full:grid-cols-2 gap-16 mt-16 px-[8%]">
          <div className="image-class">
            <img width={500} src={'data:image/png;base64,' + tour.image} alt={tour.image} />
          </div>
          <div className="text-white flex flex-col items-start gap-6 justify-start border-white/30">
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-3">
                {/* Render star rating and review count here */}
              </div>
              <div className="flex items-start justify-start gap-5 tablet:gap-10 border-y border-white/20 w-full py-6">
                <div className="flex flex-col gap-2 items-start">
                  <h2 className="font-light whitespace-nowrap">Start Date</h2>
                  <h2 className="font-semibold text-lg">{new Date(tour.startDate).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}</h2>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <h2 className="font-light whitespace-nowrap">End Date</h2>
                  <h2 className="font-semibold text-lg">{new Date(tour.endDate).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}</h2>
                </div>
                <div className="flex flex-col gap-2 items-center tablet:items-start text-center ">
                  <h2 className="font-light whitespace-nowrap">Max. Participants</h2>
                  <h2 className="font-semibold text-lg w-fit max-w-[100px] tablet:max-w-fit">{tour.maxParticipants} persons</h2>
                </div>
              </div>
            </div>
            <div className="text-white flex flex-col w-full gap-5 pt-2">
              <FaRegCalendar />
              <button className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-200 hover:bg-yellow-400">
              Book Tour
            </button>



            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={tour.reviewRating} />
              <span className="text-white/60 text-base mb-1 font-light">
                {!tour.reviewRating
                  ? "( No reviews yet )"
                  : `( ${tour.tourId} reviews )`}
              </span>
            </div>
          </div>
        </div>

        {/*<div className="text-white flex flex-col w-full gap-5 pt-2">*/}

        {/*  /!*Add to Favorite Tours*!/*/}
        {/*  /!*<FaRegBookmark />*!/*/}

        {/*  /!*Delete from Favorite Tours*!/*/}
        {/*  /!*<FaRegTrashCan />*!/*/}



        {/*</div>*/}
        <div className="text-white pt-24 relative">
          <ul
              className={` text-white/40 flex border-b px-[5%] laptop:px-[0%] laptop:mx-[8%] border-b-white/20
             flex-nowrap overflow-auto gap-10 whitespace-nowrap`}
          >
            <NavLinkTour route="." end={true}>
              Overview
            </NavLinkTour>
            <NavLinkTour route="itinerary">Itinerary</NavLinkTour>
            <NavLinkTour route="meeting">Meeting & Pickup</NavLinkTour>
            <NavLinkTour route="dates">Dates & Prices</NavLinkTour>
            <NavLinkTour route="reviews">Reviews</NavLinkTour>
          </ul>
          <div className="px-[8%]">
            <Outlet />
          </div>
        </div>
      </main>
  );
};
