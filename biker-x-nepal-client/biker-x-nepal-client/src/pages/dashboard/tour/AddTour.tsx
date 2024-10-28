import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    CardOverflow,
    Divider,
} from '@mui/joy';
import { toast } from 'react-toastify';

function AddTour() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

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

    const onSubmit = (formData) => {
        const payload = { ...formData, image };
        addTourMutation.mutate(payload);
    };

    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]);
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '1000px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Add New Tour</Typography>
                            <Typography level="body-sm">
                                Provide details about the tour.
                            </Typography>
                        </Box>
                        <Divider />
                        <Stack spacing={2} sx={{ my: 1 }}>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Name *</FormLabel>
                                    <Textarea {...register("tourName", { required: "Tour name is required" })} />
                                    <p>{errors?.tourName?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Type *</FormLabel>
                                    <Select {...register("tourType", { required: "Tour type is required" })} defaultValue="">
                                        <Option value="">Select Tour Type</Option>
                                        <Option value="dual-sports">Dual-Sports</Option>
                                        <Option value="trail">Trail</Option>
                                        <Option value="circuit">Circuit</Option>
                                        <Option value="extreme">Extreme</Option>
                                    </Select>
                                    <p>{errors?.tourType?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack spacing={1}>
                                <FormLabel>Description *</FormLabel>
                                <Textarea {...register("tourDescription", { required: "Description is required" })} />
                                <p>{errors?.tourDescription?.message}</p>
                            </Stack>
                            <Stack spacing={1}>
                                <FormLabel>Itinerary (Optional)</FormLabel>
                                <Textarea {...register("tourItinerary")} />
                                <p>{errors?.tourItinerary?.message}</p>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Start Date *</FormLabel>
                                    <Input type="date" {...register("startDate", { required: "Start date is required" })} />
                                    <p>{errors?.startDate?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>End Date *</FormLabel>
                                    <Input type="date" {...register("endDate", { required: "End date is required" })} />
                                    <p>{errors?.endDate?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Max Participants *</FormLabel>
                                    <Input type="number" {...register("maxParticipants", { required: "Max participants is required" })} />
                                    <p>{errors?.maxParticipants?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Rating *</FormLabel>
                                    <Input
                                        type="text" // Switch to text to accept decimal input
                                        inputMode="decimal" // Provides a decimal keyboard on mobile
                                        {...register("tourRating", {
                                            required: "Rating is required",
                                            pattern: {
                                                value: /^[0-9]+(\.[0-9]{1,2})?$/, // Allows integers and up to 2 decimal places
                                                message: "Please enter a valid rating (e.g., 3.5)"
                                            }
                                        })}
                                    />
                                    <p>{errors?.tourRating?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Comfort Rating *</FormLabel>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        {...register("comfortRating", {
                                            required: "Comfort Rating is required",
                                            pattern: {
                                                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                                message: "Please enter a valid comfort rating (e.g., 4.5)"
                                            }
                                        })}
                                    />
                                    <p>{errors?.comfortRating?.message}</p>
                                </Stack>

                                <Stack sx={{ flex: 2 }}>
                                    <FormLabel>Google Map Link (Optional)</FormLabel>
                                    <Textarea {...register("tourMap")} />
                                    <p>{errors?.tourMap?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Price *</FormLabel>
                                    <Input type="number" {...register("tourPrice", { required: "Tour Price is required" })} />
                                    <p>{errors?.tourPrice?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Image</FormLabel>
                                    <Input type="file" onChange={handleImageUpload} />
                                </Stack>
                            </Stack>
                        </Stack>

                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm" variant="outlined" color="neutral" onClick={() => navigate("/dashboard/tour/list")}>
                                    Cancel
                                </Button>
                                <Button size="sm" variant="solid" type="submit">
                                    Save
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
}

export default AddTour;
