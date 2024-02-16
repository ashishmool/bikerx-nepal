import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListBooking() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_BOOKINGS"],
        queryFn() {
            return axios.get("http://localhost:8080/booking/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_BOOKING_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://localhost:8080/booking/delete/${id}`);
        },
        onSuccess() {
            refetch();
        }
    });

    useEffect(() => {
        setBookings(data?.data || []);
    }, [data]);

    return (
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
                    <td>{booking.tour.tourId}</td>
                    <td>{booking.user.userId}</td>
                    <td>{booking.bikeId}</td>
                    <td>{booking.quantityPersons}</td>
                    <td>${booking.totalAmount}</td>
                    <td>{booking.paymentStatus}</td>
                    <td>
                        <button onClick={() => navigate(`/dashboard/booking/update/${booking.purchaseId}`)}>
                            <EditIcon />
                            Edit
                        </button>
                        <button onClick={() => deleteByIdApi.mutate(booking.purchaseId)}>
                            <DeleteIcon />
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ListBooking;
