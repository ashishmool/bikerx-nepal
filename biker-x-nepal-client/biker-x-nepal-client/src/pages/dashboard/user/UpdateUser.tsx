import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Stack,
    IconButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Typography,
    Textarea,
    Switch
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {toast} from "react-toastify";

function UpdateUser() {
    const { id } = useParams();
    console.log("User ID:", id);

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const { data: userByIdData, isLoading } = useQuery({
        queryKey: ["GET_USER_BY_ID", id],
        queryFn() {
            return axios.get(`http://localhost:8080/system-user/getById/${id}`);
        },
        enabled: !!id
    });

    useEffect(() => {
        if (userByIdData) {
            setUserData(userByIdData.data);
        }
    }, [userByIdData]);

    const updateUserMutation = useMutation({
        mutationKey: ["UPDATE_USER"],
        mutationFn(payload) {
            return axios.put(`http://localhost:8080/system-user/update/${id}`, payload);
        },
        onSuccess() {
            toast.success('User Data Updated Successfully!');

            navigate("/dashboard/user/list");
        }
    });

    const onSubmit = (formData) => {
        const mergedData = {
            ...userData,
            ...formData,
        };
        if (updateUserMutation) {
            updateUserMutation.mutate(mergedData);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/user/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Textarea defaultValue={userData?.firstName} {...register("firstName")} />
                        <p>{errors?.firstName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Textarea defaultValue={userData?.lastName} {...register("lastName")} />
                        <p>{errors?.lastName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Textarea defaultValue={userData?.email} {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Textarea defaultValue={userData?.role} {...register("role")} />
                        <p>{errors?.role?.message}</p>
                    </FormControl>
                    {/* Add more fields as needed */}
                </Stack>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        width: '50%',
                        mt: 2,
                        py: 2,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    Update User
                </Button>
            </form>
        </Box>
    );
}

export default UpdateUser;
