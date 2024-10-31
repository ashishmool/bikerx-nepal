import * as React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {toast, ToastContainer} from "react-toastify";



function ListTour() {
    const navigate = useNavigate();


    const { data, refetch } = useQuery({
        queryKey: ["GET_TOURS"],
        queryFn() {
            return axios.get("http://localhost:8080/tour/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_TOUR_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://localhost:8080/tour/delete/${id}`);
        },
        onSuccess() {
            toast.success('Tour Delete Successful!');

            refetch();
        }
    });



    return (

        <>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                <button
                    style={{
                        padding: '8px 16px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: location.pathname === '/dashboard/tour/create' ? '#4CAF50' : '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                    onClick={() => navigate('/dashboard/tour/create')}
                >
                    <AddIcon style={{ marginRight: '8px', color: 'white'}} />

                    Add New Tour
                </button>
            </div>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>Photo</th>
                    <th>Tour Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Max. Participants</th>
                    <th>Difficulty Rating</th>
                    <th>Comfort Rating</th>
                    <th>Price (NPR)</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data.map((tour) => (
                    <tr key={tour.tourId} style={{ borderBottom: '1px solid #ddd' }}>
                        <td>
                            <img width={200} src={'data:image/png;base64,' + tour.image} alt={tour.tourName} />
                        </td>
                        <td>{tour.tourName}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '200px' }}>
                            {tour.tourDescription.split(' ').slice(0, 12).join(' ')}...
                        </td>
                        <td>
                            {new Date(tour.startDate).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td>
                            {new Date(tour.endDate).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td>{tour.maxParticipants}</td>
                        <td>{tour.tourRating}</td>
                        <td>{tour.comfortRating}</td>
                        <td>{tour.tourPrice.toFixed(2)}</td>
                        <td>
                            <button onClick={() => deleteByIdApi.mutate(tour.tourId)}>
                                <DeleteIcon />
                                Delete
                            </button>
                            <button onClick={() => navigate(`/dashboard/tour/update/${tour.tourId}`)}>
                                <EditIcon />
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

    <ToastContainer/>
        </>
    );
}

export default ListTour;
