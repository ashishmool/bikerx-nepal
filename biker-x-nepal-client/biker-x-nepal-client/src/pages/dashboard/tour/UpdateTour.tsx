import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import * as React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back icon


function UpdateTour() {
    const { id } = useParams();
    console.log("Tour ID:", id); // Log the ID to ensure it's correctly received

    const navigate = useNavigate();
    const [tourData, setTourData] = useState(null); // State variable to hold the tour data
    const [image, setImage] = useState(null); // State variable to hold the image file
    const { register, handleSubmit, formState } = useForm(); // Form control
    const { errors } = formState; // Form errors
    const [bookingStatus, setBookingStatus] = useState(false); // Default status is Unavailable

    const toggleBookingStatus = () => {
        setBookingStatus(!bookingStatus); // Toggle the booking status
    };


    // Query to fetch tour data by ID
    const { data: tourByIdData, isLoading } = useQuery({
        queryKey: ["GET_TOUR_BY_ID", id],
        queryFn() {
            return axios.get(`http://localhost:8080/tour/getById/${id}`);
        },
        enabled: !!id // Ensure the query is only enabled when ID is available
    });

    // Effect to set tour data when fetched
    useEffect(() => {
        if (tourByIdData) {
            setTourData(tourByIdData.data);
        }
    }, [tourByIdData]);

    // Mutation to update tour data
    const updateTourMutation = useMutation({
        mutationKey: ["UPDATE_TOUR"],
        mutationFn(payload) {
            // Use FormData to handle file uploads
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });
            return axios.put(`http://localhost:8080/tour/update/${id}`, formData);
        },
        onSuccess() {
            navigate("/dashboard/tour/list");
        }
    });

    // Function to handle form submission
    const onSubmit = (formData) => {
        // Merge existing tour data with form data
        const mergedData = {
            ...tourData, // Existing tour data
            ...formData, // Form data
        };

        // Check and set default values for fields that can be null
        Object.entries(mergedData).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                // Set default values for null or undefined fields
                if (key === "endDate") {
                    mergedData[key] = ""; // Or any default value you prefer for endDate
                } else {
                    mergedData[key] = ""; // Or any default value you prefer for other fields
                }
            }
        });

        // Add the image file to the merged data if it's not null or undefined
        if (image) {
            mergedData.image = image;
        }

        console.log("Payload data being sent:", mergedData); // Log the payload data
        updateTourMutation.mutate(mergedData); // Call the mutation to update tour data
    };

    // Function to handle image upload
    const handleImageUpload = (event) => {
        setImage(event?.target?.files[0]); // Set the image file to the state variable
    };

    if (isLoading) return <p>Loading...</p>; // Display loading indicator while fetching data

    return (


        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}> {/* Apply styling to the form */}
            <IconButton onClick={() => navigate("/dashboard/tour/list")} aria-label="back"> {/* Back button with icon */}
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Tour Name</FormLabel>
                        <Textarea defaultValue={tourData?.tourName} {...register("tourName")} />
                        <p>{errors?.tourName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea defaultValue={tourData?.tourDescription} {...register("tourDescription")} />
                        <p>{errors?.tourDescription?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tour Type</FormLabel>
                        <Select
                            defaultValue={tourData?.tourType} // Set default value if necessary
                            {...register("tourType", { required: "Tour type is required" })}
                        >
                            <Option value="">Select Tour Type</Option>
                            <Option value="on-road">On-road</Option>
                            <Option value="off-road">Off-road</Option>
                            <Option value="on-off-combined">On-Off Combined</Option>
                        </Select>
                        <p>{errors?.tourType?.message}</p>
                    </FormControl>



                    <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <Input type="date" defaultValue={tourData?.startDate} {...register("startDate")} />
                        <p>{errors?.startDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>End Date</FormLabel>
                        <Input type="date" defaultValue={tourData?.endDate} {...register("endDate")} />
                        <p>{errors?.endDate?.message}</p>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Max Participants</FormLabel>
                        <Textarea type="number" defaultValue={tourData?.maxParticipants} {...register("maxParticipants")} />
                        <p>{errors?.maxParticipants?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tour Rating</FormLabel>
                        <Textarea type="number" defaultValue={tourData?.tourRating} {...register("tourRating")} />
                        <p>{errors?.tourRating?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tour Price</FormLabel>
                        <Textarea type="number" defaultValue={tourData?.tourPrice} {...register("tourPrice")} />
                        <p>{errors?.tourPrice?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Booking Status <Switch
                            {...register("tourAvailability")}
                            defaultChecked={false} // Set default checked state if necessary
                            onClick={toggleBookingStatus}
                        /></FormLabel>
                        <div>
                            <small>Set Status To: {bookingStatus ? "Available" : "Unavailable"}</small> | <small>Current Status: {tourData?.tourAvailability ? "Available" : "Unavailable"}</small>
                        </div>
                        <p>{errors?.tourAvailability?.message}</p>
                    </FormControl>
                    <FormControl>

                        <FormLabel>Choose New Image:  <Input type="file" onChange={handleImageUpload} /></FormLabel>
                        <FormLabel><small><strong>Current Image Name :</strong> {tourData?.image} </small></FormLabel>

                    </FormControl>

                    {/*<FormControl>*/}
                    {/*    <FormLabel>Itinerary</FormLabel>*/}
                    {/*    <Textarea defaultValue={tourData?.tourItinerary} {...register("tourItinerary")} />*/}
                    {/*    <p>{errors?.tourItinerary?.message}</p>*/}
                    {/*</FormControl>*/}

                </Stack>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        width: '50%', // Set button width to 100%
                        mt: 2, // Add margin-top for spacing
                        py: 2, // Padding on the y-axis
                        fontSize: '1.2rem', // Increase font size
                        fontWeight: 'bold', // Make text bold
                        backgroundColor: '#1976d2', // Set background color to a shade of blue
                        color: 'white', // Set text color to white
                        borderRadius: '8px', // Add border radius for rounded corners
                        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)', // Add box shadow for depth
                        transition: 'background-color 0.3s', // Add transition effect for hover
                        '&:hover': {
                            backgroundColor: '#1565c0', // Darker background color on hover
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
