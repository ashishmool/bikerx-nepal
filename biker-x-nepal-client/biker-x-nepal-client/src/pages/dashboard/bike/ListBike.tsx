import * as React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from "@mui/icons-material/Add";

function ListBike() {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_BIKES"],
        queryFn() {
            return axios.get("http://localhost:8080/bike/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_BIKE_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://localhost:8080/bike/delete/${id}`);
        },
        onSuccess() {
            toast.success('Bike Remove Successful!');
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
                        backgroundColor: location.pathname === '/dashboard/bike/add' ? '#4CAF50' : '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                    onClick={() => navigate('/dashboard/bike/add')}
                >
                    <AddIcon style={{ marginRight: '8px', color: 'white'}} />

                    Add New Bike
                </button>
            </div>

            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>Photo</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Quantity</th>
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
                        <td>{bike.bikePrice}</td>
                        <td>{bike.quantityStock}</td>
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
