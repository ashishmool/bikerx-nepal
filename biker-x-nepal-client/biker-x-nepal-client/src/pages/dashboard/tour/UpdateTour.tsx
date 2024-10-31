import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
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
    CardOverflow,
    Divider,
} from '@mui/joy';
import { toast } from 'react-toastify';

function UpdateTour() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null); // State to hold the selected PDF file

    const { register, handleSubmit, setValue, formState } = useForm();
    const { errors } = formState;

    const { data: tourByIdData, isLoading } = useQuery({
        queryKey: ["GET_TOUR_BY_ID", id],
        queryFn: () => axios.get(`http://localhost:8080/tour/getById/${id}`),
        enabled: !!id
    });

    useEffect(() => {
        if (tourByIdData) {
            const {
                tourName,
                tourDescription,
                tourItinerary,
                tourType,
                startDate,
                endDate,
                maxParticipants,
                tourRating,
                comfortRating,
                tourMap,
                tourPrice,
                imageUrl, // Assuming you get image URL from the backend
                pdfUrl // Assuming you get pdf URL from the backend
            } = tourByIdData.data;

            setValue("tourName", tourName);
            setValue("tourDescription", tourDescription);
            setValue("tourItinerary", tourItinerary);
            setValue("tourType", tourType);
            setValue("startDate", new Date(startDate).toISOString().split("T")[0]);
            setValue("endDate", new Date(endDate).toISOString().split("T")[0]);
            setValue("maxParticipants", maxParticipants);
            setValue("tourRating", tourRating);
            setValue("comfortRating", comfortRating);
            setValue("tourMap", tourMap);
            setValue("tourPrice", tourPrice);

            // Set the state with existing values
            setImage(imageUrl || null);
            setPdf(pdfUrl || null);
        }
    }, [tourByIdData, setValue]);

    const updateTourMutation = useMutation({
        mutationKey: ["UPDATE_TOUR"],
        mutationFn(formData) {
            const updatedData = new FormData();

            // Append existing values if no new files are provided
            if (image) updatedData.append("image", image);
            if (pdf) updatedData.append("pdf", pdf);

            // Append all form data fields
            Object.entries(formData).forEach(([key, value]) => {
                updatedData.append(key, value);
            });

            // Log the FormData to see what is being sent
            for (const [key, value] of updatedData.entries()) {
                console.log(key, value);
            }

            return axios.put(`http://localhost:8080/tour/update/${id}`, updatedData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set header for file upload
                },
            });
        },
        onSuccess() {
            toast.success("Tour updated successfully!");
            navigate("/dashboard/tour/list");
        },
        onError(err) {
            toast.error("Failed to update tour: " + (err.response?.data?.message || "An error occurred"));
        }
    });

    const onSubmit = (formData) => {
        const payload = { ...formData }; // Don't include image/pdf here, handled in mutation
        updateTourMutation.mutate(payload); // Make sure you are using the correct mutate function here
    };

    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]);
    };

    const handlePdfUpload = (event) => {
        setPdf(event?.target?.files[0]);
    };

    if (isLoading) return <p>Loading...</p>;

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
                            <Typography level="title-md">Update Tour</Typography>
                            <Typography level="body-sm">
                                Update the details of the tour.
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
                            <Stack spacing={2}>
                                <FormLabel>Description *</FormLabel>
                                <Textarea {...register("tourDescription", { required: "Description is required" })} />
                                <p>{errors?.tourDescription?.message}</p>
                            </Stack>
                            <Stack spacing={2}>
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
                                {/* Tour Price Field */}
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Tour Price *</FormLabel>
                                    <Input
                                        type="text" // Allows decimal input
                                        inputMode="decimal"
                                        {...register("tourPrice", {
                                            required: "Tour Price is required",
                                            pattern: {
                                                value: /^[0-9]+(\.[0-9]{1,2})?$/, // Allows integers and up to 2 decimal places
                                                message: "Please enter a valid price (e.g., 200.99)"
                                            }
                                        })}
                                    />
                                    <p>{errors?.tourPrice?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Max Participants *</FormLabel>
                                    <Input type="number" {...register("maxParticipants", { required: "Max participants is required" })} />
                                    <p>{errors?.maxParticipants?.message}</p>
                                </Stack>
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
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Google Map Link (Optional)</FormLabel>
                                    <Textarea {...register("tourMap")} />
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Choose New Image</FormLabel>
                                    <Input type="file" onChange={handleImageUpload} />
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Upload PDF (Optional)</FormLabel>
                                    <Input type="file" accept="application/pdf" onChange={handlePdfUpload} />
                                </Stack>
                            </Stack>
                        </Stack>

                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm" variant="outlined" color="neutral" onClick={() => navigate("/dashboard/tour/list")}>
                                    Cancel
                                </Button>
                                <Button size="sm" variant="solid" type="submit">
                                    Update Tour
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
}

export default UpdateTour;
