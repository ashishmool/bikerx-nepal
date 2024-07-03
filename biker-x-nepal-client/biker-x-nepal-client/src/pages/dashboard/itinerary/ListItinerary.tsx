import * as React from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function ListItinerary() {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_ITINERARIES"],
        queryFn() {
            return axios.get("http://13.48.249.115:8080/itinerary/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_ITINERARY_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://13.48.249.115:8080/itinerary/delete/${id}`);
        },
        onSuccess() {
            toast.success('Itinerary Delete Success');
            refetch();
        }
    });

    return (
        <>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tour ID</th>
                    <th>No of Days</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data.map((itinerary) => (
                    <tr key={itinerary.itineraryId} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ wordWrap: 'break-word', maxWidth: '30px' }}>{itinerary.itineraryId}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{itinerary.tourId}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{itinerary.noOfDays}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{itinerary.description}</td>
                        <td style={{ textAlign:'center'}}>
                            <button onClick={() => navigate(`/dashboard/itinerary/update/${itinerary.itineraryId}`)}>
                                <EditIcon />
                                Edit
                            </button>
                            <button onClick={() => deleteByIdApi.mutate(itinerary.itineraryId)}>
                                <DeleteIcon />
                                Delete
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

export default ListItinerary;
