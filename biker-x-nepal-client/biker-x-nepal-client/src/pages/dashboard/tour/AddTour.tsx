import * as React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Stack,
    AspectRatio,
    IconButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    Option,
    Button,
    Typography,
    Textarea, Switch
} from '@mui/joy';
// import { EditRounded as EditRoundedIcon, EmailRounded as EmailRoundedIcon, AccessTimeFilledRounded as AccessTimeFilledRoundedIcon, HomeRounded as HomeRoundedIcon, ChevronRightRounded as ChevronRightRoundedIcon, InsertDriveFileRounded as InsertDriveFileRoundedIcon, VideocamRounded as VideocamRoundedIcon } from '@mui/icons-material';
// import Breadcrumbs from '@mui/joy/Breadcrumbs';
// import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AddTour() {
    const { pk_id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null); // State variable to hold the image file

    const useApiCall = useMutation({
        mutationKey: ["POST_TOUR_CREATE"],
        mutationFn: (payload) => {
            console.log(payload);
            return axios.post("http://localhost:8080/tour/save", payload);
        },
        onSuccess() {
            toast.success('Tour Add Successful!');

            navigate("/dashboard/tour/list");
        }
    });

    const { data: getByIdApi } = useQuery({
        queryKey: ["GET_BY_ID_TOUR_API"],
        queryFn() {
            return axios.get("http://localhost:8080/tour/getById/" + pk_id)
        },
        enabled: !!pk_id
    });

    console.log(getByIdApi?.data);

    const { register, handleSubmit, formState } = useForm(
        { values: getByIdApi?.data }
    );

    const { errors } = formState;

    const onSubmit = (data) => {
        // Add the image file to the form data
        const formData = new FormData();
        formData.append("image", image); // Add image file to formData
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        useApiCall.mutate(formData);
    };

    console.log(errors);

    // Function to handle image upload
    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]); // Set the image file to the state variable
    };

    return (
        <>
            <Box sx={{ flex: 1, width: '100%' }}>
                <Box
                    sx={{
                        position: 'sticky',
                        top: { sm: -100, md: -110 },
                        bgcolor: 'background.body',
                        zIndex: 9995,
                    }}
                >


                </Box>
                <Stack
                    spacing={4}
                    sx={{
                        display: 'flex',
                        maxWidth: '1600px',
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
                                        <Select
                                            {...register("tourType", { required: "Tour type is required" })}
                                            defaultValue="" // Set default value if necessary
                                        >
                                            <Option value="on-road">On-road</Option>
                                            <Option value="off-road">Off-road</Option>
                                            <Option value="on-off-combined">On-Off Combined</Option>
                                        </Select>
                                        <p>{errors?.tourType?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Itinerary (Optional)</FormLabel>
                                        <Textarea {...register("tourItinerary")}></Textarea>
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
                                        <FormLabel>Booking Status  <Switch
                                            {...register("tourAvailability")}
                                            defaultChecked={true} // Set default checked state if necessary
                                        /></FormLabel>

                                        <p>{errors?.tourAvailability?.message}</p>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Image</FormLabel>
                                        {/* Use the handleImageUpload function */}
                                        <Input type="file" onChange={handleImageUpload} />
                                    </Stack>
                                </Stack>
                            </Stack>

                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
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
        </>
    );
}

export default AddTour;
