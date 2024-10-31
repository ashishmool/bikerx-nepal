    import * as React from 'react';
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
    Button,
    Typography,
    Textarea, Switch, Select, Option
} from '@mui/joy';
// import { InsertDriveFileRounded as InsertDriveFileRoundedIcon } from '@mui/icons-material';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddBike() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null); // State variable to hold the image file

    const useApiCall = useMutation({
        mutationKey: ["POST_BIKE_CREATE"],
        mutationFn: (payload) => {
            console.log(payload);
            return axios.post("http://localhost:8080/bike/save", payload);
        },
        onSuccess() {
            toast.success('Bike Add Successful!');
            navigate("/dashboard/bike/list");
        }
    });

    const { register, handleSubmit, formState } = useForm();

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

    // Function to handle image upload
    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]); // Set the image file to the state variable
    };

    return (
        <>
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
                                <Typography level="title-md">Add New Bike</Typography>
                                <Typography level="body-sm">
                                    Provide details about the bike.
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Make/Brand *</FormLabel>
                                        <Input type="text" {...register("makeBrand", { required: "Make/Brand is required" })} />
                                        <p>{errors?.makeBrand?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Model *</FormLabel>
                                        <Input type="text" {...register("model", { required: "Model is required" })} />
                                        <p>{errors?.model?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Terrain *</FormLabel>
                                        <Select {...register("terrain", { required: "Terrain is required" })} defaultValue="">
                                            <Option value="">Select Terrain Type</Option>
                                            <Option value="on-road">On-Road</Option>
                                            <Option value="all-terrain">All Terrain</Option>
                                        </Select>
                                        <p>{errors?.terrain?.message}</p>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Year *</FormLabel>
                                        <Input type="number" {...register("year", { required: "Year is required" })} />
                                        <p>{errors?.year?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Description *</FormLabel>
                                        <Textarea {...register("description", { required: "Description is required" })}></Textarea>
                                        <p>{errors?.description?.message}</p>
                                    </Stack>
                                </Stack>


                                <Stack direction="row" spacing={1}>
                                    {/* Bike Price Field */}
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Bike Price *</FormLabel>
                                        <Input
                                            type="text" // Allows decimal input
                                            inputMode="decimal"
                                            {...register("bikePrice", {
                                                required: "Bike Price is required",
                                                pattern: {
                                                    value: /^[0-9]+(\.[0-9]{1,2})?$/, // Allows integers and up to 2 decimal places
                                                    message: "Please enter a valid price (e.g., 1000.50)"
                                                }
                                            })}
                                        />
                                        <p>{errors?.bikePrice?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Quantity *</FormLabel>
                                        <Input type="number" {...register("quantityStock", { required: "Quantity is required" })} />
                                        <p>{errors?.quantityStock?.message}</p>
                                    </Stack>
                                </Stack>



                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Image</FormLabel>
                                        {/* Use the handleImageUpload function */}
                                        <Input type="file" onChange={handleImageUpload} />
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Owner's Email *</FormLabel>
                                        <Input type="text" {...register("ownerEmail", { required: "Owner Email is required" })} />
                                        <p>{errors?.ownerEmail?.message}</p>
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

export default AddBike;
