import { useEffect, useState } from "react";
import axios from "axios";

export const MyTour = () => {
    const [bookings, setBookings] = useState([]);
    const [tourDetails, setTourDetails] = useState({});
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://13.48.249.115:8080/booking/getByUserId/${userId}`);
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
                const response = await axios.get(`http://13.48.249.115:8080/tour/getById/${tourId}`);
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

    return (
        <main>
            <div className="h-[400px] relative z-[1] w-full bg-[url('/src/images/bgImages/mars-bg.jpg')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black/50">
                <h1 className="relative text-[--main-font-color] top-[50%] translate-y-[-50%] text-center font-bold text-5xl tablet:text-6xl font-serif tracking-wide">
                    My Booked Tours
                </h1>
            </div>

            <div className="mt-8 px-4">
                <table className="w-70vw mx-auto border border-white text-white">
                    <thead>
                    <tr>
                        <th className="border border-white p-2">Booking No.</th>
                        <th className="border border-white p-2">Booked Tour</th>
                        <th className="border border-white p-2">Start Date</th>
                        <th className="border border-white p-2">End Date</th>
                        <th className="border border-white p-2">No. of Persons</th>
                        {/*<th className="border border-white p-2">Total Amount</th>*/}
                        {/*<th className="border border-white p-2">Payment Status</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td className="border border-white p-2">{booking.purchaseId}</td>
                            <td className="border border-white p-2">
                                {tourDetails[booking.tourId] ? tourDetails[booking.tourId].tourName : "Loading..."}
                            </td>
                            <td className="border border-white p-2">
                                {tourDetails[booking.tourId] ? new Date(tourDetails[booking.tourId].startDate).toLocaleDateString() : "Loading..."}
                            </td>
                            <td className="border border-white p-2">
                                {tourDetails[booking.tourId] ? new Date(tourDetails[booking.tourId].endDate).toLocaleDateString() : "Loading..."}
                            </td>
                            {/*<td className="border border-white p-2">{booking.purchaseDate}</td>*/}
                            <td className="border border-white p-2">{booking.quantityPersons}</td>
                            {/*<td className="border border-white p-2">{booking.totalAmount}</td>*/}
                            {/*<td className="border border-white p-2">{booking.paymentStatus}</td>*/}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};
