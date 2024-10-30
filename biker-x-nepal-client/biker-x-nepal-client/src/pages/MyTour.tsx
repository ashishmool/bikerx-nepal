import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HelmetRating from "../ui/HelmetRating"; // Assuming you'll use this for difficulty rating
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { Link } from "react-router-dom";
import axios from "axios";
import {ProductSidebar} from "../features/FilterSidebar/ProductSidebar.tsx";

export const MyTour = () => {
    const [bookings, setBookings] = useState([]);
    const [tourDetails, setTourDetails] = useState({});
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Fetch bookings by userId
                const response = await axios.get(`http://localhost:8080/booking/getByUserId/${userId}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [userId]);

    useEffect(() => {
        const fetchTourDetails = async (tourId) => {
            try {
                // Fetch tour details by tourId inside the booking
                const response = await axios.get(`http://localhost:8080/tour/getById/${tourId}`);
                setTourDetails((prevDetails) => ({
                    ...prevDetails,
                    [tourId]: response.data // Storing tour details by tourId
                }));
            } catch (error) {
                console.error("Error fetching tour details:", error);
                setTourDetails((prevDetails) => ({
                    ...prevDetails,
                    [tourId]: null // Set tourDetails to null in case of error
                }));
            }
        };

        // Fetch tour details for each booking's tourId
        bookings.forEach((booking) => {
            fetchTourDetails(booking.tourId);
        });
    }, [bookings]);

    // Helper function to calculate days remaining until the tour starts
    const calculateDaysToGo = (startDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const diffTime = start.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;  // Avoid negative days
    };

    // Helper function to calculate duration between start and end dates
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <main className="relative">
            <ProductSidebar /> {/* Sidebar for filtering products */}
            <div
                className="h-[400px] relative w-full bg-[url('/src/images/bgImages/shop-bg.jpg')] bg-cover bg-center
        before:content-[''] before:absolute before:inset-0 before:bg-black/50"
            >
                <motion.h1
                    initial={{ opacity: 0, translateY: "-200%" }}
                    animate={{ opacity: 1, translateY: "-50%" }}
                    transition={{ duration: 1.0 }}
                    className="relative text-[--main-font-color] top-[50%] translate-y-[-50%] text-center
        font-bold text-5xl tablet:text-6xl font-serif tracking-wide z-[0]"
                >
                    My Bookings
                </motion.h1>
            </div>
        <div className="px-[3%] min-[1200px]:px-[10%] text-white flex flex-col items-center bg-transparent py-24 gap-4">
            <motion.h1
                initial={{ opacity: 0, translateY: "100%" }}
                whileInView={{ opacity: 1, translateY: "0%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl text-yellow-500"
            >
                Confirmed Bookings
            </motion.h1>
            <motion.h3
                initial={{ opacity: 0, translateY: "100%" }}
                whileInView={{ opacity: 1, translateY: "0%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl laptop:text-5xl text-white font-semibold text-center"
            >
                ARE YOU READY?
            </motion.h3>

            <div className="w-full flex flex-col gap-4 pt-8 max-w-[900px]">
                {bookings.length === 0 ? (
                    <p className="text-center">You have no booked tours.</p>
                ) : (
                    <>
                        {/* Table Header */}
                        <div className="w-full flex justify-between items-center py-2 border-b border-white font-bold">
                            <span className="w-[14%] text-center">Booking No.</span>
                            <span className="w-[14%] text-center">Tour Name</span>
                            <span className="w-[14%] text-center">Start Date</span>
                            <span className="w-[14%] text-center">Duration</span>
                            <span className="w-[14%] text-center text-yellow-500">Days to Go</span>
                            <span className="w-[14%] text-center text-yellow-500">Booking Status</span>
                            <span className="w-[16%] text-center">Request Change</span>
                        </div>

                        {/* Table Rows (Mapped Bookings) */}
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, translateY: "100%" }}
                                whileInView={{ opacity: 1, translateY: "0%" }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="w-full flex justify-between items-center py-4 border-b border-white"
                            >
                                <span className="w-[14%] text-center">{booking.purchaseId}</span>
                                <span className="w-[14%] text-center font-semibold">
                                    {tourDetails[booking.tourId] ? tourDetails[booking.tourId].tourName : "Loading..."}
                                </span>
                                <span className="w-[14%] text-center">
                                    {tourDetails[booking.tourId] ? new Date(tourDetails[booking.tourId].startDate).toLocaleDateString() : "Loading..."}
                                </span>
                                <span className="w-[14%] text-center">
                                    {tourDetails[booking.tourId] ? `${calculateDuration(tourDetails[booking.tourId].startDate, tourDetails[booking.tourId].endDate)} days` : "Loading..."}
                                </span>
                                <span className="w-[14%] text-center text-yellow-500">
                                    {tourDetails[booking.tourId] ? (
                                        calculateDaysToGo(tourDetails[booking.tourId].startDate) <= 0 ?
                                            "Complete" :
                                            `${calculateDaysToGo(tourDetails[booking.tourId].startDate)} days`
                                    ) : "Loading..."}
                                </span>

                                <span
                                    className={`w-[14%] text-center ${booking.paymentStatus === 'COMPLETED' ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {booking.paymentStatus === 'COMPLETED' ? 'Confirmed' : 'Pending'}
                                </span>


                                <span className="w-[16%] text-center cursor-pointer">
                                    {tourDetails[booking.tourId] && calculateDaysToGo(tourDetails[booking.tourId].startDate) > 45 ? (
                                        // Enable Link Button if Days To Go > 45
                                        <Link
                                            to={`/tours/${booking.tourId}`} // Link to the tour details page
                                            className="flex items-center justify-center p-2 rounded-full bg-transparent hover:bg-white/20 transition duration-200"
                                        >
                                            <TwoWheelerIcon /> {/* Button Icon */}
                                        </Link>
                                    ) : (
                                        // Disable Button with hover info if Days To Go <= 45
                                        <div
                                            className="flex items-center justify-center p-2 rounded-full bg-gray-600 text-gray-400 cursor-not-allowed relative group"
                                            title="Booking is available only 45 days before the start date."
                                        >
                                            <TwoWheelerIcon />
                                            <span className="absolute bottom-full mb-1 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                Booking Amendments is available only 45 days before the start date.
                                            </span>
                                        </div>
                                    )}
                                </span>



                            </motion.div>
                        ))}
                    </>
                )}
            </div>
        </div>
        </main>
    );
};
