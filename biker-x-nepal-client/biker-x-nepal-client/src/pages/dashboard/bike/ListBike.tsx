import * as React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListBike() {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_BIKES"],
        queryFn() {
            return axios.get("http://13.48.249.115:8080/bike/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_BIKE_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://13.48.249.115:8080/bike/delete/${id}`);
        },
        onSuccess() {
            toast.success('Bike Remove Successful!');
            refetch();
        }
    });

    return (
        <>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>Photo</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data.map((bike) => (
                    <tr key={bike.bikeId} style={{ borderBottom: '1px solid #ddd' }}>
                        <td><img width={200} src={'data:image/png;base64,' + bike.image} alt={bike.image} /></td>
                        <td>{bike.makeBrand}</td>
                        <td>{bike.model}</td>
                        <td>{bike.year}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '200px' }}>{bike.description}</td>
                        <td>
                            <button onClick={() => navigate(`/dashboard/bike/update/${bike.bikeId}`)}>
                                <EditIcon />
                                Edit
                            </button>
                            <button onClick={() => deleteByIdApi.mutate(bike.bikeId)}>
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

export default ListBike;
