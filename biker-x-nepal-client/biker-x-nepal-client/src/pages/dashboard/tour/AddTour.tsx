import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Stack,
    IconButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    Option,
    Button,
    Typography,
    Textarea,
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

function AddTour() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Form management using react-hook-form
    const { register, handleSubmit, formState, watch } = useForm();
    const { errors } = formState;


    // Mutation to add a new tour
    const addTourMutation = useMutation({
        mutationKey: ["ADD_TOUR"],
        mutationFn(payload) {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });
            return axios.post("http://localhost:8080/tour/save", formData);
        },
        onSuccess() {
            toast.success("Tour added successfully!");
            navigate("/dashboard/tour/list");
        },
        onError(err) {
            toast.error("Failed to add tour: " + (err.response?.data?.message || "An error occurred"));
        }
    });

    // Submit handler
    const onSubmit = (formData) => {
        const payload = { ...formData, image };

        // Log the payload to the console
        console.log("Payload being sent:", payload);

        addTourMutation.mutate(payload);
    };

    // Image upload handler
    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]);
    };

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/tour/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <Typography level="h2" fontWeight="bold" textAlign="center" mb={3}>
                Add New Tour
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Tour Name</FormLabel>
                        <Textarea {...register("tourName", { required: "Tour name is required" })} />
                        <p>{errors?.tourName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea {...register("tourDescription", { required: "Description is required" })} />
                        <p>{errors?.tourDescription?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tour Type</FormLabel>
                        <Select {...register("tourType", { required: "Tour type is required" })} defaultValue="">
                            <Option value="">Select Tour Type</Option>
                            <Option value="adventure">Adventure</Option>
                            <Option value="leisure">Leisure</Option>
                            <Option value="city">City</Option>
                            <Option value="extreme">Extreme</Option>
                        </Select>
                        <p>{errors?.tourType?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <Input type="date" {...register("startDate", { required: "Start date is required" })} />
                        <p>{errors?.startDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>End Date</FormLabel>
                        <Input type="date" {...register("endDate", { required: "End date is required" })} />
                        <p>{errors?.endDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Max Participants</FormLabel>
                        <Input type="number" {...register("maxParticipants", { required: "Max participants is required" })} />
                        <p>{errors?.maxParticipants?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tour Rating</FormLabel>
                        <Input type="number" {...register("tourRating", { required: "Rating is required" })} />
                        <p>{errors?.tourRating?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Choose Image: <Input type="file" onChange={handleImageUpload} />
                        </FormLabel>
                    </FormControl>


                    <FormControl>
                        <FormLabel>Tour Price</FormLabel>
                        <Input type="number" {...register("tourPrice", { required: "Tour Price is required" })} />
                        <p>{errors?.tourPrice?.message}</p>
                    </FormControl>
                </Stack>
                <Button variant="contained" type="submit" sx={{ width: '50%', mt: 2, py: 2, fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Add Tour
                </Button>
            </form>
        </Box>
    );
}

export default AddTour;
