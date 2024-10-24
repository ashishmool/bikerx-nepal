import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HelmetRating from "../ui/HelmetRating"; // Import the HelmetRating component
import { Link } from "react-router-dom"; // Import Link for navigation
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

export const Upcoming = () => {
    const [upcomingTours, setUpcomingTours] = useState([]);

    useEffect(() => {
        // Fetching tour data from backend
        const fetchTours = async () => {
            try {
                const response = await fetch("http://localhost:8080/tour/getAll");
                const tours = await response.json();
                const futureTours = tours
                    .filter((tour) => isFutureTour(tour.startDate))
                    .sort((a, b) => calculateDaysToGo(a.startDate) - calculateDaysToGo(b.startDate)); // Sort by "Days to Go"
                setUpcomingTours(futureTours);
            } catch (error) {
                console.error("Error fetching tours:", error);
            }
        };

        fetchTours();
    }, []);

    // Helper function to check if a tour is in the future
    const isFutureTour = (startDate) => {
        const today = new Date();
        const tourStartDate = new Date(startDate);
        return tourStartDate >= today;
    };

    // Helper function to calculate duration between start and end dates
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Helper function to calculate days remaining until the tour starts
    const calculateDaysToGo = (startDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const diffTime = start.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;  // Avoid negative days
    };

    return (
        <div className="px-[3%] min-[1200px]:px-[10%] text-white flex flex-col items-center bg-transparent py-24 gap-4">
            <motion.h1
                initial={{ opacity: 0, translateY: "100%" }}
                whileInView={{ opacity: 1, translateY: "0%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl text-yellow-500"
            >
                UPCOMING TOURS & EVENTS
            </motion.h1>
            <motion.h3
                initial={{ opacity: 0, translateY: "100%" }}
                whileInView={{ opacity: 1, translateY: "0%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl laptop:text-5xl text-white font-semibold text-center"
            >
                Plan Your Next Adventure!
            </motion.h3>

            <div className="w-full flex flex-col gap-4 pt-8 max-w-[900px]">
                {upcomingTours.length === 0 ? (
                    <p className="text-center">No upcoming tours available.</p>
                ) : (
                    <>
                        {/* Table Header */}
                        <div className="w-full flex justify-between items-center py-2 border-b border-white font-bold">
                            <span className="w-[16.6%] text-center">Tour Destination</span>
                            <span className="w-[16.6%] text-center">Start Date</span>
                            <span className="w-[16.6%] text-center">No. of Days</span>
                            <span className="w-[16.6%] text-center">Tour Difficulty</span>
                            <span className="w-[16.6%] text-center text-yellow-500">Days to Go</span>
                            <span className="w-[16.6%] text-center text-yellow-500">Book Now</span>
                        </div>

                        {/* Table Rows (Mapped Tours) */}
                        {upcomingTours.map((tour, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, translateY: "100%" }}
                                whileInView={{ opacity: 1, translateY: "0%" }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="w-full flex justify-between items-center py-4 border-b border-white"
                            >
                                <span className="w-[16.6%] text-center font-semibold">{tour.tourName}</span>
                                <span className="w-[16.6%] text-center">{tour.startDate}</span>
                                <span className="w-[16.6%] text-center">
                                    {calculateDuration(tour.startDate, tour.endDate)} {calculateDuration(tour.startDate, tour.endDate) <= 1 ? "day" : "days"}
                                </span>
                                <span className="w-[16.6%] text-center flex justify-center">
                                    <HelmetRating difficultyRating={tour.tourRating} /> {/* Use HelmetRating */}
                                </span>

                                <span className="w-[16.6%] text-center text-yellow-500">
                                    {calculateDaysToGo(tour.startDate)} {calculateDaysToGo(tour.startDate) <= 1 ? "day" : "days"}
                                </span>
                                <span className="w-[16.6%] text-center cursor-pointer">
                                    <Link
                                        to={`/tours/${tour.tourId}`} // Link to the specific tour booking page
                                        className="flex items-center justify-center p-2 rounded-full bg-transparent hover:bg-white/20 transition duration-200"
                                    >
                                        <TwoWheelerIcon /> {/* Button Icon */}
                                    </Link>
                                </span>
                            </motion.div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
