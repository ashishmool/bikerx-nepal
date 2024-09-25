import * as React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Stack,
    FormLabel,
    Input,
    Select,
    Option,
    Button,
    Typography,
    Textarea,
    Card,
    CardActions,
    Divider,
    Switch
} from '@mui/joy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTour() {
    const { pk_id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null); // State variable to hold the image file

    // Fetch the tour by ID for pre-populating the form
    const { data: getByIdApi } = useQuery({
        queryKey: ["GET_BY_ID_TOUR_API"],
        queryFn: () => axios.get(`http://localhost:8080/tour/getById/${pk_id}`),
        enabled: !!pk_id,
    });

    const useApiCall = useMutation({
        mutationKey: ["POST_TOUR_CREATE"],
        mutationFn: (payload) => {
            console.log(payload);
            return axios.post("http://localhost:8080/tour/save", payload);
        },
        onSuccess() {
            toast.success('Tour added successfully!');
            navigate("/dashboard/tour/list");
        },
        onError(err) {
            toast.error(`Error: ${err.message}`);
        }
    });

    // Use default values only if getByIdApi is loaded
    const { register, handleSubmit, formState } = useForm({
        defaultValues: getByIdApi ? getByIdApi.data : {}
    });

    const { errors } = formState;

    const onSubmit = (data) => {
        // Create a FormData object to handle file upload
        const formData = new FormData();
        if (image) {
            formData.append("image", image); // Add image file to formData
        }
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        useApiCall.mutate(formData);
    };

    // Function to handle image upload
    const handleImageUpload = (event) => {
        // Safeguard against null event
        if (!event || !event.target) {
            toast.error("Failed to upload image. Please try again.");
            return;
        }

        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0]; // Access the first file
            if (file) {
                setImage(file); // Set the image file to the state variable
            }
        } else {
            toast.error("No file selected");
        }
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Stack spacing={4} sx={{ maxWidth: '1600px', mx: 'auto', px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } }}>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Add New Tour</Typography>
                            <Typography level="body-sm">Provide details about the tour.</Typography>
                        </Box>
                        <Divider />
                        <Stack spacing={2} sx={{ my: 1 }}>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Name *</FormLabel>
                                    <Input type="text" {...register("tourName", { required: "Tour name is required" })} />
                                    <p>{errors?.tourName?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Description *</FormLabel>
                                    <Input type="text" {...register("tourDescription", { required: "Description is required" })} />
                                    <p>{errors?.tourDescription?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Type</FormLabel>
                                    <Select {...register("tourType", { required: "Tour type is required" })} defaultValue="">
                                        <Option value="on-road">On-road</Option>
                                        <Option value="off-road">Off-road</Option>
                                        <Option value="on-off-combined">On-Off Combined</Option>
                                    </Select>
                                    <p>{errors?.tourType?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Itinerary (Optional)</FormLabel>
                                    <Textarea {...register("tourItinerary")} />
                                    <p>{errors?.tourItinerary?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input type="date" {...register("startDate", { required: "Start date is required" })} />
                                    <p>{errors?.startDate?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>End Date</FormLabel>
                                    <Input type="date" {...register("endDate", { required: "End date is required" })} />
                                    <p>{errors?.endDate?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Max Participants</FormLabel>
                                    <Input type="number" {...register("maxParticipants", { required: "Max participants is required" })} />
                                    <p>{errors?.maxParticipants?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Difficulty (Easy:1 - Adventurous:5)</FormLabel>
                                    <Input type="number" {...register("tourRating", { required: "Tour rating is required" })} />
                                    <p>{errors?.tourRating?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Price</FormLabel>
                                    <Input type="number" {...register("tourPrice", { required: "Tour price is required" })} />
                                    <p>{errors?.tourPrice?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Booking Status</FormLabel>
                                    <Switch {...register("tourAvailability")} defaultChecked={true} />
                                    <p>{errors?.tourAvailability?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Image</FormLabel>
                                    <Input type="file" onChange={handleImageUpload} />
                                </Stack>
                            </Stack>
                        </Stack>

                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="outlined" color="neutral" onClick={() => navigate("/dashboard/tour/list")}>
                                Cancel
                            </Button>
                            <Button size="sm" variant="solid" type="submit">
                                Save
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
}

export default AddTour;
