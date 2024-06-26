import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaRegCalendar, FaRegBookmark, FaRegTrashCan, FaChevronRight } from 'react-icons/fa';
import { Spinner } from '../ui/Spinner';
import { WrongPage } from './WrongPage';
import { NavLinkTour } from "../ui/NavLinkTour.tsx";
import { StarRating } from "../ui/StarRating.tsx";
import {toast, ToastContainer} from "react-toastify";

export const SpecificTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [totalAmount, setTotalAmount] = useState(0); // State for totalAmount
  const [selectedBikeId, setSelectedBikeId] = useState(null); // State for selected bike ID
  const [bikesData, setBikesData] = useState(null); // State for bike data

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
      // Initialize totalAmount to tour.price when tour is available
      setTotalAmount(tour.tourPrice);
    }
  }, [tour]);

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    // Ensure quantity is not less than 1
    value = Math.max(1, value);
    setQuantity(value);
    // Update totalAmount based on quantity and tour price
    setTotalAmount(value * tour.tourPrice);
  };

  const handleBikeChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setSelectedBikeId(selectedId);
  };

  const fetchBikes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bike/getAll");
      console.log("Response from fetchBikes:", response.data); // Log the response data
      setBikesData(response.data);
      return response.data; // Return the data
    } catch (error) {
      console.error("Error fetching bikes:", error);
      throw error;
    }
  };


  const bookTour = async () => {
    if (!localStorage.getItem("accessToken")) {

      // If user is not logged in, redirect to login page
      navigate('/login');
      return;
    }

    const userId = localStorage.getItem("userId");



    try {
      const response = await axios.post(
          'http://localhost:8080/booking/save',
          {
            purchaseDate: new Date(),
            tourId: id,
            userId: userId,
            quantityPersons: quantity,
            paymentStatus: 'PENDING',
            totalAmount: totalAmount,
            bikeId: selectedBikeId // Add selected bike ID to the booking data
          }

      );
      toast.success("Booked Successfully!");
      // Handle successful booking
      console.log('Booking successful:', response.data);
      // Reset form fields after successful booking
      setQuantity(1);
      setSelectedBikeId(null);
      setTotalAmount(0);

    } catch (error) {
      // Handle booking error
      console.error('Error booking tour:', error);
    }
  };

  useEffect(() => {
    fetchBikes()
        .then(data => {
          console.log("Bikes Data:", data); // Log the bikesData array
          setBikesData(data);
        })
        .catch(error => {
          console.error("Error fetching bikes:", error);
          setError(error.message);
        });
  }, []);


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
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-light">No of Persons:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border rounded-md py-1 px-2 text-black"
                />
              </div>
              {/* Bike selection dropdown */}
              <div className="flex items-center gap-4">
                <label htmlFor="bike" className="font-light">Select Bike:</label>
                <select
                    id="bike"
                    name="bike"
                    onChange={handleBikeChange}
                    className="border rounded-md py-1 px-2 text-black"
                >
                  <option value="">Select a Bike</option>
                  {bikesData && bikesData.map(bike => (
                      <option key={bike.bikeId} value={bike.bikeId}>{bike.makeBrand} {bike.model}</option>
                  ))}
                </select>

              </div>
              <p>Total Amount: Rs. {totalAmount}</p>
              {/* Book tour button */}
              <button
                  onClick={bookTour}
                  // disabled={!localStorage.getItem("accessToken")}
                  className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-200 hover:bg-yellow-400"
              >
                Book Tour
              </button>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={tour.reviewRating} />
              <span className="text-white/60 text-base mb-1 font-light">
              {!tour.reviewRating ? "( No reviews yet )" : `( ${tour.tourId} reviews )`}
            </span>
            </div>
          </div>
        </div>
        <div className="text-white pt-24 relative">
          <ul
              className={` text-white/40 flex border-b px-[5%] laptop:px-[0%] laptop:mx-[8%] border-b-white/20
             flex-nowrap overflow-auto gap-10 whitespace-nowrap`}
          >
            <NavLinkTour route=".">
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
          <ToastContainer />
        </div>
      </main>
  );
};
