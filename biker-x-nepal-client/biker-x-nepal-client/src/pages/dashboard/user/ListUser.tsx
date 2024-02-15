import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ListUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/system-user/getAllWithoutPassword');
            console.log('Users Fetched:', response.data);
            // Filter out the password field from each user object
            const filteredUsers = response.data.map(user => {
                const { password, ...rest } = user;
                return rest;
            });
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_USER_BY_ID"],
        mutationFn(id) {
            return axios.delete(`http://localhost:8080/system-user/delete/${id}`);
        },
        onSuccess() {
            fetchUsers();
        }
    });

    return (
        <>
            <table border={1} style={{ width: '90%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.userId} style={{ borderBottom: '1px solid #ddd' }}>
                        <td>{user.userId}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => navigate(`/dashboard/user/update/${user.userId}`)}>
                                <EditIcon />
                                Edit
                            </button>
                            <button onClick={() => deleteByIdApi.mutate(user.userId)}>
                                <DeleteIcon />
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default ListUser;
