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
    Select,
    Option,
    Button,
    Typography,
    Textarea,
    Switch
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

function UpdateTour() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [bookingStatusLabel, setBookingStatusLabel] = useState("Unavailable");

    const { register, handleSubmit, formState, reset, setValue, watch } = useForm();
    const { errors } = formState;

    // Query to fetch tour data by ID
    const { data: tourByIdData, isLoading } = useQuery({
        queryKey: ["GET_TOUR_BY_ID", id],
        queryFn: () => axios.get(`http://localhost:8080/tour/getById/${id}`),
        enabled: !!id
    });

    // Watch form values to handle dynamic updates
    const watchTourAvailability = watch("tourAvailability", false);

    // Set booking status label dynamically
    useEffect(() => {
        setBookingStatusLabel(watchTourAvailability ? "Available" : "Unavailable");
    }, [watchTourAvailability]);

    // Reset form with fetched data and set individual form fields
    useEffect(() => {
        if (tourByIdData) {
            const { tourName, tourDescription, tourType, startDate, endDate, maxParticipants, tourRating, tourPrice, tourAvailability } = tourByIdData.data;
            reset(tourByIdData.data); // Reset all fields
            setValue("tourType", tourType); // Set the tourType in Select
            setValue("startDate", new Date(startDate).toISOString().split("T")[0]); // Format date properly
            setValue("endDate", new Date(endDate).toISOString().split("T")[0]); // Format date properly
            setValue("tourAvailability", tourAvailability); // Set the switch status
        }
    }, [tourByIdData, reset, setValue]);

    // Mutation to update tour data
    const updateTourMutation = useMutation({
        mutationKey: ["UPDATE_TOUR"],
        mutationFn(payload) {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });
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

    // Handle form submission
    const onSubmit = (formData) => {
        const changes = detectChanges(formData);
        if (Object.keys(changes).length > 0) {
            updateTourMutation.mutate(changes);
        } else {
            console.log("No changes detected.");
        }
    };

    // Detect changes between initial and current values
    const detectChanges = (formData) => {
        const changes = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== tourByIdData.data[key]) {
                changes[key] = value;
            }
        });

        // Include new image if uploaded
        if (image) {
            changes.image = image;
        }

        return changes;
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/tour/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Tour Name</FormLabel>
                        <Textarea {...register("tourName")} />
                        <p>{errors?.tourName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea {...register("tourDescription")} />
                        <p>{errors?.tourDescription?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tour Type</FormLabel>
                        <Select {...register("tourType", { required: "Tour type is required" })} defaultValue={tourByIdData?.data?.tourType || ""}>
                            <Option value="">Select Tour Type</Option>
                            <Option value="on-road">On-road</Option>
                            <Option value="off-road">Off-road</Option>
                            <Option value="on-off-combined">On-Off Combined</Option>
                        </Select>
                        <p>{errors?.tourType?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <Input type="date" {...register("startDate")} />
                        <p>{errors?.startDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>End Date</FormLabel>
                        <Input type="date" {...register("endDate")} />
                        <p>{errors?.endDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Max Participants</FormLabel>
                        <Input type="number" {...register("maxParticipants")} />
                        <p>{errors?.maxParticipants?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tour Rating</FormLabel>
                        <Input type="number" {...register("tourRating")} />
                        <p>{errors?.tourRating?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tour Price</FormLabel>
                        <Input type="number" {...register("tourPrice")} />
                        <p>{errors?.tourPrice?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Booking Status: <span>{bookingStatusLabel}</span>
                            <Switch {...register("tourAvailability")} checked={watchTourAvailability} />
                        </FormLabel>
                        <p>{errors?.tourAvailability?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Choose New Image: <Input type="file" onChange={handleImageUpload} />
                        </FormLabel>
                    </FormControl>
                </Stack>
                <Button variant="contained" type="submit" sx={{ width: '50%', mt: 2, py: 2, fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Update Tour
                </Button>
            </form>
        </Box>
    );
}

export default UpdateTour;
