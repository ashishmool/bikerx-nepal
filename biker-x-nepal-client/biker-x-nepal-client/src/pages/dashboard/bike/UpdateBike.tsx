import { useState, useEffect } from "react";
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
    Textarea,
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBike() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState } = useForm();
    const { errors } = formState;

    // Fetch the bike data by ID
    const { data: bikeByIdData, isLoading } = useQuery({
        queryKey: ["GET_BIKE_BY_ID", id],
        queryFn: () => axios.get(`http://localhost:8080/bike/getById/${id}`),
        enabled: !!id // Only run query if `id` is present
    });

    useEffect(() => {
        if (bikeByIdData) {
            const bikeData = bikeByIdData.data;
            // Set form values with the fetched bike data
            setValue("makeBrand", bikeData.makeBrand);
            setValue("model", bikeData.model);
            setValue("year", bikeData.year);
            setValue("description", bikeData.description);
        }
    }, [bikeByIdData, setValue]);

    // Define the mutation for updating bike data
    const updateBikeMutation = useMutation({
        mutationKey: ["UPDATE_BIKE"],
        mutationFn: async (updatedData) => {
            // Use Axios to send a PUT request to the server with form data
            return await axios.put(`http://localhost:8080/bike/update/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // FormData should have multipart headers
                }
            });
        },
        onSuccess: (response) => {
            console.log('Update success response:', response.data);
            toast.success('Updated Bike Data Successfully!');
            navigate("/dashboard/bike/list");
        },
        onError: (error) => {
            console.error('Update failed:', error); // Log the error for debugging
            toast.error('Failed to update bike data!');
        },
    });

    // Form submission handler
    const onSubmit = (formData) => {
        const updatedData = new FormData();

        // Handle the image only if it's a new image selection
        if (formData.image && formData.image.length > 0) {
            updatedData.append("image", formData.image[0]); // Append the image file if selected
        }

        // Append other form fields
        updatedData.append("makeBrand", formData.makeBrand);
        updatedData.append("model", formData.model);
        updatedData.append("year", String(formData.year)); // Ensure that year is a string
        updatedData.append("description", formData.description);

        // Log FormData content for debugging
        for (let pair of updatedData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Trigger the mutation to update bike data
        updateBikeMutation.mutate(updatedData);
    };

    if (isLoading) return <p>Loading...</p>; // Show a loading message while fetching bike data

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/bike/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Brand</FormLabel>
                        <Textarea
                            {...register("makeBrand", { required: "Make/Brand is required." })}
                        />
                        <p>{errors.makeBrand?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Model</FormLabel>
                        <Textarea
                            {...register("model", { required: "Model is required." })}
                        />
                        <p>{errors.model?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Year</FormLabel>
                        <Textarea
                            {...register("year", { required: "Year is required." })}
                        />
                        <p>{errors.year?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            {...register("description", { required: "Description is required." })}
                        />
                        <p>{errors.description?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Choose New Image:</FormLabel>
                        <Input
                            type="file"
                            {...register("image")} // Allow file input for image
                        />
                    </FormControl>
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
                    Update Bike
                </Button>
            </form>
        </Box>
    );
}

export default UpdateBike;
