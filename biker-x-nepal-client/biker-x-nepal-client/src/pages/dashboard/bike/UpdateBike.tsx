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
    Select,
    Option,
    Typography,
    Card,
    CardActions,
    Divider,
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBike() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState } = useForm();
    const { errors } = formState;
    const [image, setImage] = useState(null);

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
            setValue("bikePrice", bikeData.bikePrice);
            setValue("quantityStock", bikeData.quantityStock);
            setValue("ownerEmail", bikeData.ownerEmail);
            setValue("terrain", bikeData.terrain); // Set default terrain value here
            setValue("image", bikeData.image); // Set default terrain value here
        }
    }, [bikeByIdData, setValue]);

    // Define the mutation for updating bike data
    const updateBikeMutation = useMutation({
        mutationKey: ["UPDATE_BIKE"],
        mutationFn: async (updatedData) => {
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
        if (image) {
            updatedData.append("image", image); // Append the image file if selected
        }

        // Append other form fields
        updatedData.append("makeBrand", formData.makeBrand);
        updatedData.append("model", formData.model);
        updatedData.append("year", String(formData.year)); // Ensure that year is a string
        updatedData.append("description", formData.description);
        updatedData.append("bikePrice", formData.bikePrice);
        updatedData.append("quantityStock", formData.quantityStock);
        updatedData.append("ownerEmail", formData.ownerEmail);
        updatedData.append("terrain", formData.terrain); // Append terrain value

        // Trigger the mutation to update bike data
        updateBikeMutation.mutate(updatedData);
    };

    if (isLoading) return <p>Loading...</p>; // Show a loading message while fetching bike data

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <IconButton onClick={() => navigate("/dashboard/bike/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
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
                            <Typography level="title-md">Update Bike Details</Typography>
                            <Typography level="body-sm">Update the details for the selected bike.</Typography>
                        </Box>
                        <Divider />
                        <Stack spacing={2} sx={{ my: 1 }}>

                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Make/Brand *</FormLabel>
                                    <Input type="text" {...register("makeBrand", { required: "Make/Brand is required." })} />
                                    <p>{errors.makeBrand?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Model *</FormLabel>
                                    <Input type="text" {...register("model", { required: "Model is required." })} />
                                    <p>{errors.model?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Terrain *</FormLabel>
                                    <FormControl error={!!errors.terrain}>
                                        <Select
                                            {...register("terrain", { required: "Terrain is required." })}
                                            defaultValue="" // No need to set a defaultValue here
                                        >
                                            <Option value="">Select Terrain Type</Option>
                                            <Option value="on-road">On-Road</Option>
                                            <Option value="off-road">Off-Road</Option>
                                        </Select>
                                        <p>{errors.terrain?.message}</p>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Year *</FormLabel>
                                    <Input type="number" {...register("year", { required: "Year is required." })} />
                                    <p>{errors.year?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Description *</FormLabel>
                                    <Textarea {...register("description", { required: "Description is required." })} />
                                    <p>{errors.description?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Price *</FormLabel>
                                    <Input type="number" {...register("bikePrice", { required: "Bike Price is required." })} />
                                    <p>{errors.bikePrice?.message}</p>
                                </Stack>
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Quantity *</FormLabel>
                                    <Input type="number" {...register("quantityStock", { required: "Quantity is required." })} />
                                    <p>{errors.quantityStock?.message}</p>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                {/*/!* Display the image if it exists *!/*/}
                                {/*<Box sx={{ mb: 2 }}>*/}
                                {/*    <img width={200} src={`data:image/png;base64,${null}`} alt="Bike" />*/}
                                {/*</Box>*/}
                                <Stack sx={{ flex: 1 }}>
                                    <FormLabel>Choose New Image:</FormLabel>
                                    <Input
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])} // Set the image file to the state variable
                                    />
                                </Stack>
                            </Stack>
                            <Stack sx={{ flex: 1 }}>
                                <FormLabel>Owner's Email *</FormLabel>
                                <Input type="text" {...register("ownerEmail", { required: "Owner Email is required." })} />
                                <p>{errors.ownerEmail?.message}</p>
                            </Stack>
                        </Stack>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="outlined" color="neutral" onClick={() => navigate("/dashboard/bike/list")}>
                                Cancel
                            </Button>
                            <Button size="sm" variant="solid" type="submit">
                                Update
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
}

export default UpdateBike;
