import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaRegCalendar, FaCalendarCheck } from 'react-icons/fa';
import { Spinner } from '../ui/Spinner';
import { WrongPage } from './WrongPage';
import { NavLinkTour } from "../ui/NavLinkTour.tsx";
// import { StarRating } from "../ui/StarRating.tsx";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumb from "../utils/Breadcrumb.tsx";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import HotelIcon from '@mui/icons-material/Hotel';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { motion } from 'framer-motion';

import { FaUserGroup } from "react-icons/fa6";
import {FaClockRotateLeft} from "react-icons/fa6";



export const SpecificTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bikesSelected, setBikesSelected] = useState(Array(1).fill(null)); // Array to track bikes selected for each dropdown
  const [bikesData, setBikesData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tour/getById/${id}`);
        setTour(response.data);
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

  useEffect(() => {
    if (tour) {
      setTotalAmount(tour.tourPrice);  // Set initial amount to tour price
    }
  }, [tour]);

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);

    // Ensure quantity is not less than 1 and doesn't exceed max participants
    if (value > tour.maxParticipants) {
      value = tour.maxParticipants;
      toast.warn(`Cannot exceed maximum participants: ${tour.maxParticipants}`);
    } else if (value < 1) {
      value = 1;
    }

    setQuantity(value);
    setBikesSelected(Array(value).fill(null));  // Update array to match the new quantity
    calculateTotal(value, bikesSelected);
  };

  const handleBikeChange = (e, index) => {
    const selectedId = parseInt(e.target.value);
    const bike = bikesData.find(bike => bike.bikeId === selectedId);

    const updatedBikesSelected = [...bikesSelected];
    updatedBikesSelected[index] = bike;
    setBikesSelected(updatedBikesSelected);

    calculateTotal(quantity, updatedBikesSelected);
  };

  const calculateTotal = (quantity, bikesSelected) => {
    let total = tour.tourPrice * quantity;  // Base tour price for all persons

    bikesSelected.forEach(bike => {
      if (bike) {
        total += duration * bike.bikePrice;  // Add bike price per person
      }
    });

    setTotalAmount(parseFloat(total.toFixed(2)));
  };

  const fetchBikes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bike/getAll");
      setBikesData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const getAvailableBikes = (index) => {
    if (!bikesData) {
      return [];  // Return an empty array if bikesData is null or undefined
    }

    return bikesData.map(bike => {
      const timesSelected = bikesSelected.filter(b => b && b.bikeId === bike.bikeId).length;
      const remainingStock = bike.quantityStock - timesSelected;

      if (remainingStock > 0 || (bikesSelected[index] && bikesSelected[index].bikeId === bike.bikeId)) {
        return { ...bike, remainingStock };
      }
      return null;
    }).filter(bike => bike !== null);
  };


  const bookTour = async () => {
    if (!localStorage.getItem("accessToken")) {
      navigate('/login');
      return;
    }

    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("email"); // Get the user's email from localStorage

    try {
      await axios.post(
          'http://localhost:8080/booking/save',
          {
            purchaseDate: new Date(),
            tourId: id,
            userId: userId,
            quantityPersons: quantity,
            paymentStatus: 'PENDING',
            totalAmount: totalAmount,
            bikeIds: bikesSelected.map(bike => bike?.bikeId).filter(Boolean), // Send array of selected bikes
            startDate: tour.startDate,  // Include start date
            endDate: tour.endDate,      // Include end date
            userEmail: userEmail         // Include email in the request
          }
      );

      // Reset the state after booking
      setQuantity(1);
      setBikesSelected(Array(1).fill(null));
      setTotalAmount(0);

      toast.success("Booked Successfully!");

      // Delay navigation by 2 seconds (2000 milliseconds)
      setTimeout(() => {
        navigate(`/my-tour/${userId}`, { replace: true });
      }, 1000); // Adjust the duration as needed

    } catch (error) {
      console.error('Error booking tour:', error);
    }
  };




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

  const startDate = new Date(tour.startDate);
  const endDate = new Date(tour.endDate);
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  return (
      <main className="relative pt-32">
        <div className="flex text-[--secundary-color] gap-5 px-[8%] flex-col laptop:flex-row justify-between">
      <span className="gap-2">
        <Breadcrumb tour={tour} />
      </span>
          <Link
              to="/tours"
              className="border-b border-white/40 transition duration-200 hover:text-white flex items-center gap-2 w-fit cursor-pointer"
          >
            <FaArrowLeft />
            Get back
          </Link>
        </div>

        <div className="grid grid-cols-1 full:grid-cols-2 gap-16 mt-16 px-[8%]">
          <div className="image-class">
            <img width={750} src={'data:image/png;base64,' + tour.image} />
            {/* Attribute Icons Section */}
            <motion.div
                className="flex justify-around py-8 bg-white/10 rounded-lg mt-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              {/* Riding Level */}
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold text-yellow-500 relative mb-2">
                  <span className="rounded-full bg-yellow-500 text-black px-3 py-1 absolute -top-6">{tour.tourRating}</span>
                </h2>
                <TwoWheelerIcon fontSize="large" className="text-white/70" />
                <span className="text-sm text-white/60">Riding Level</span>
                <div className="text-xs text-yellow-400 mt-1 text-center">
                  Beginner (1) - Expert (5)
                </div>
              </div>

              {/* Comfort */}
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold text-yellow-500 relative mb-2">
                  <span className="rounded-full bg-yellow-500 text-black px-3 py-1 absolute -top-6">{tour.comfortRating}</span>
                </h2>
                <HotelIcon fontSize="large" className="text-white/70" />
                <span className="text-sm text-white/60">Comfort</span>
                <div className="text-xs text-yellow-400 mt-1 text-center">
                    Basic (1) - Luxury (5)
                </div>
              </div>

              {/* Period */}
              <div className="flex flex-col items-center">
                <EventRepeatIcon fontSize="large" className="text-white/70" />
                <span className="text-sm text-white/60">Period</span>
                {/* Start and End Month Display */}
                <div className="text-xs text-yellow-400 mt-1 text-center"> {/* Center-align the months */}
                  {new Date(tour.startDate).toLocaleString('en-US', { month: 'short' })}
                  {new Date(tour.startDate).getMonth() === new Date(tour.endDate).getMonth()
                      ? ` - ${new Date(new Date(tour.startDate).setMonth(new Date(tour.startDate).getMonth() + 1)).toLocaleString('en-US', { month: 'short' })}`
                      : ` - ${new Date(tour.endDate).toLocaleString('en-US', { month: 'short' })}`}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-white flex flex-col items-start gap-6 justify-start border-white/30">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col gap-2 items-start text-2xl text-yellow-500 font-extrabold">
                {tour.tourName}
              </div>
              {/* Google Map Embed */}
              {/* Google Map Embed */}
              <div className="mt-0 flex justify-center">
                <iframe
                    src={tour.tourMap}
                    width="700"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="flex items-start justify-start gap-5 tablet:gap-10 border-y border-white/20 w-full py-6">
                {/* Start Date Section */}
                <div className="flex flex-col gap-2 items-center"> {/* Changed to items-center */}
                  <div className="flex items-center gap-2"> {/* Align icon and title inline */}
                    <FaRegCalendar className="text-yellow-500" />
                    <h2 className="font-light whitespace-nowrap text-yellow-500">Start Date</h2>
                  </div>
                  <h2 className="font-semibold text-lg text-center "> {/* Center align value */}
                    {startDate.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}
                  </h2>
                </div>

                {/* End Date Section */}
                <div className="flex flex-col gap-2 items-center"> {/* Changed to items-center */}
                  <div className="flex items-center gap-2"> {/* Align icon and title inline */}
                    <FaCalendarCheck className="text-yellow-500" />
                    <h2 className="font-light whitespace-nowrap text-yellow-500">End Date</h2>
                  </div>
                  <h2 className="font-semibold text-lg text-center"> {/* Center align value */}
                    {endDate.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}
                  </h2>
                </div>

                {/* Duration Section */}
                <div className="flex flex-col gap-2 items-center"> {/* Changed to items-center */}
                  <div className="flex items-center gap-2"> {/* Align icon and title inline */}
                    <FaClockRotateLeft className="text-yellow-500" />
                    <h2 className="font-light whitespace-nowrap text-yellow-500">Duration</h2>
                  </div>
                  <h2 className="font-semibold text-lg text-center"> {/* Center align value */}
                    {duration} nights | {duration + 1} days
                  </h2>
                </div>

                {/* Max Participants Section */}
                <div className="flex flex-col gap-2 items-center"> {/* Changed to items-center */}
                  <div className="flex items-center gap-2"> {/* Align icon and title inline */}
                    <FaUserGroup className="text-yellow-500" />
                    <h2 className="font-light whitespace-nowrap text-yellow-500">Max. Participants</h2>
                  </div>
                  <h2 className="font-semibold text-lg w-fit max-w-[100px] tablet:max-w-fit text-center"> {/* Center align value */}
                    {tour.maxParticipants} persons
                  </h2>
                </div>
              </div>
            </div>

            {/* Conditionally render booking section or fully booked message */}
            {tour.maxParticipants === 0 ? (
                <div className="text-white text-xl font-bold py-4">
                  This Tour is Fully Booked! Check for future dates.
                </div>
            ) : (
                <div className="text-white flex flex-col w-full gap-5 pt-2">
                  <div className="flex items-center gap-4">
                    <label htmlFor="quantity" className="font-light">No of Persons:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border rounded-md py-1 px-2 text-black w-1/5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: quantity }).map((_, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <label htmlFor={`bike-${index}`} className="font-light">
                            Bike {index + 1}:
                          </label>
                          <select
                              id={`bike-${index}`}
                              name={`bike-${index}`}
                              onChange={(e) => handleBikeChange(e, index)}
                              className="border rounded-md py-1 px-2 text-black w-2/3" // Reduces size to 2/3
                              value={bikesSelected[index]?.bikeId || ""}
                          >
                            <option value="">Select a Bike</option>
                            {getAvailableBikes(index).map((bike) => (
                                <option key={bike.bikeId} value={bike.bikeId}>
                                  {bike.makeBrand} {bike.model} (Rs. {bike.bikePrice}/day, Stock: {bike.remainingStock})
                                </option>
                            ))}
                          </select>
                        </div>
                    ))}
                  </div>

                  <p className="text-2xl font-bold">Total Amount: Rs. {totalAmount}</p>
                  <button
                      onClick={bookTour}
                      className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-200 hover:bg-yellow-400"
                  >
                    Book Tour
                  </button>
                </div>
            )}
          </div>
        </div>
        <div className="text-white pt-8 relative">
          <ul className={`text-white/40 flex border-b px-[5%] laptop:px-[0%] laptop:mx-[8%] border-b-white/20 flex-nowrap overflow-auto gap-10 whitespace-nowrap`}>
            <NavLinkTour route="." end={true}>  {/* Set end={true} for Overview */}
              Overview
            </NavLinkTour>
            <NavLinkTour route="itinerary">
              Itinerary Brief
            </NavLinkTour>
            <NavLinkTour route="meeting">
              Meeting & Pickup
            </NavLinkTour>
          </ul>
          <div className="px-[8%]">
            <Outlet />
          </div>
          <ToastContainer />
        </div>
      </main>
  );

};
