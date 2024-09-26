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

function UpdateTour() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Form management using react-hook-form
    const { register, handleSubmit, setValue, formState } = useForm();
    const { errors } = formState;

    // Fetching tour data based on ID
    const { data: tourByIdData, isLoading } = useQuery({
        queryKey: ["GET_TOUR_BY_ID", id],
        queryFn: () => axios.get(`http://localhost:8080/tour/getById/${id}`),
        enabled: !!id
    });

    // Populate form fields when the data is fetched
    useEffect(() => {
        if (tourByIdData) {
            const { tourName, tourDescription, tourType, startDate, endDate, maxParticipants, tourRating, tourPrice } = tourByIdData.data;
            setValue("tourName", tourName);
            setValue("tourDescription", tourDescription);
            setValue("tourType", tourType);
            setValue("startDate", new Date(startDate).toISOString().split("T")[0]); // Format date
            setValue("endDate", new Date(endDate).toISOString().split("T")[0]); // Format date
            setValue("maxParticipants", maxParticipants);
            setValue("tourRating", tourRating);
            setValue("tourPrice", tourPrice);
        }
    }, [tourByIdData, setValue]);

    // Updating the tour mutation
    const updateTourMutation = useMutation({
        mutationKey: ["UPDATE_TOUR"],
        mutationFn(formData) {
            return axios.put(`http://localhost:8080/tour/update/${id}`, formData);
        },
        onSuccess() {
            toast.success("Tour updated successfully!");
            navigate("/dashboard/tour/list");
        },
        onError(err) {
            toast.error("Failed to update tour: " + (err.response?.data?.message || "An error occurred"));
        }
    });

    // Submit handler to trigger the update mutation
    const onSubmit = (formData) => {
        const updatedData = new FormData();

        // Handle the image only if it's a new image selection
        if (image) {
            updatedData.append("image", image); // Include the image file if selected
        }

        // Append other form fields
        updatedData.append("tourName", formData.tourName);
        updatedData.append("tourDescription", formData.tourDescription);
        updatedData.append("tourType", formData.tourType);
        updatedData.append("startDate", formData.startDate);
        updatedData.append("endDate", formData.endDate);
        updatedData.append("maxParticipants", String(formData.maxParticipants));
        updatedData.append("tourRating", String(formData.tourRating));
        updatedData.append("tourPrice", String(formData.tourPrice)); // Ensure it's a string to avoid NaN issues

        // Log FormData content for debugging
        for (let pair of updatedData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Trigger the mutation to update tour data
        updateTourMutation.mutate(updatedData);
    };

    // Image upload handler
    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]);
    };

    if (isLoading) return <p>Loading...</p>; // Show a loading message while fetching tour data

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/tour/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Tour Name</FormLabel>
                        <Textarea
                            {...register("tourName", { required: "Tour name is required" })}
                        />
                        <p>{errors.tourName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            {...register("tourDescription", { required: "Description is required" })}
                        />
                        <p>{errors.tourDescription?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tour Type</FormLabel>
                        <Input
                            {...register("tourType", { required: "Tour type is required" })}
                        />
                        <p>{errors.tourType?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <Input type="date" {...register("startDate", { required: "Start date is required" })} />
                        <p>{errors.startDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>End Date</FormLabel>
                        <Input type="date" {...register("endDate", { required: "End date is required" })} />
                        <p>{errors.endDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Max Participants</FormLabel>
                        <Input type="number" {...register("maxParticipants", { required: "Max participants is required" })} />
                        <p>{errors.maxParticipants?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tour Rating</FormLabel>
                        <Input type="number" {...register("tourRating", { required: "Rating is required" })} />
                        <p>{errors.tourRating?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tour Price</FormLabel>
                        <Input type="number" {...register("tourPrice", { required: "Price is required", min: { value: 0, message: "Tour price must be positive" } } )} />
                        <p>{errors.tourPrice?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Choose New Image: <Input type="file" onChange={handleImageUpload} />
                        </FormLabel>
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
                    Update Tour
                </Button>
            </form>
        </Box>
    );
}

export default UpdateTour;
