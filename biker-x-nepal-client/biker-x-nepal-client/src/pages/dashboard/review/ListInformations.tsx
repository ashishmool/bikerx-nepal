import * as React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Stars } from "@mui/icons-material";
import { Rate } from "antd";
import AddIcon from "@mui/icons-material/Add";

function ListInformations() {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ["GET_INFORMATIONS"],
        queryFn() {
            return axios.get("http://localhost:8080/information/getAll");
        }
    });

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_INFORMATION_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://localhost:8080/information/delete/${id}`);
        },
        onSuccess() {
            toast.success('Information deleted successfully');
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
                        backgroundColor: location.pathname === '/dashboard/tour/add' ? '#4CAF50' : '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                    onClick={() => navigate('/dashboard/information/add')}
                >
                    <AddIcon style={{ marginRight: '8px', color: 'white'}} />

                    Add New Information
                </button>
            </div>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.data.map((information) => (
                    <tr key={information.informationId} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ wordWrap: 'break-word', maxWidth: '30px' }}>{information.informationId}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{information.title}</td>
                        <td style={{ wordWrap: 'break-word', maxWidth: '80px' }}>{information.description}</td>
                        <td style={{ textAlign: 'center' }}>
                            <button onClick={() => navigate(`/dashboard/information/update/${information.informationId}`)}>
                                <EditIcon />
                                Edit
                            </button>
                            <button onClick={() => deleteByIdApi.mutate(information.informationId)}>
                                <DeleteIcon />
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer />
        </>
    );
}

export default ListInformations;
