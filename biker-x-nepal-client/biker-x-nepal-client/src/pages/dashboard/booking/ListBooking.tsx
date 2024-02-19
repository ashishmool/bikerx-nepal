import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function ListBooking() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_BOOKINGS"],
        queryFn() {
            return axios.get("http://localhost:8080/booking/getAll");
        }
    });

    const markAsDone = async (id) => {
        try {
            await axios.put(`http://localhost:8080/booking/update/${id}`, { paymentStatus: 'COMPLETED' });
            toast.success('Payment Marked Complete');
            refetch();
        } catch (error) {
            toast.error('Error marking DONE');
            console.error('Error marking booking as done:', error);
        }
    };




    const deleteBooking = useMutation({
        mutationKey: ["DELETE_BOOKING_BY_ID"],
        mutationFn(id) {
            console.log('purchaseId',id);
            return axios.delete(`http://localhost:8080/booking/delete/${id}`);
        },
        onSuccess() {
            toast.success('Deleted');
            refetch();
        }
    });

    useEffect(() => {
        setBookings(data?.data || []);
    }, [data]);

    return (
        <>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Purchase Date</th>
                    <th>Tour ID</th>
                    <th>User ID</th>
                    <th>Bike ID</th>
                    <th>Quantity Persons</th>
                    <th>Total Amount</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking, index) => (
                    <tr key={index}>
                        <td>{booking.purchaseId}</td>
                        <td>{new Date(booking.purchaseDate).toLocaleDateString()}</td>
                        <td>{booking.tourId}</td>
                        <td>{booking.userId}</td>
                        <td>{booking.bikeId}</td>
                        <td>{booking.quantityPersons || '-'}</td>
                        <td>Rs.{booking.totalAmount}</td>
                        <td>{booking.paymentStatus}</td>
                        <td>
                            {booking.paymentStatus !== 'COMPLETED' && booking.paymentStatus !== 'CANCEL' && booking.paymentStatus !== 'PROCESSING' && (
                                <>
                                    <button onClick={() => markAsDone(booking.purchaseId)}>
                                        <LibraryAddCheckIcon/> Done
                                    </button>
                                    <button onClick={() => deleteBooking.mutate(booking.purchaseId)}>
                                        <DeleteIcon/> Delete
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer/>
        </>
    );
}

export default ListBooking;
