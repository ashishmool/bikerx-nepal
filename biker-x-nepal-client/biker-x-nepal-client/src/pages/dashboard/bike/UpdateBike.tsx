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
    Typography,
    Textarea,
    Switch
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UpdateBike() {
    const { id } = useParams();
    console.log("Bike ID:", id);

    const navigate = useNavigate();
    const [bikeData, setBikeData] = useState(null);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const { data: bikeByIdData, isLoading } = useQuery({
        queryKey: ["GET_BIKE_BY_ID", id],
        queryFn() {
            return axios.get(`http://localhost:8080/bike/getById/${id}`);
        },
        enabled: !!id
    });

    useEffect(() => {
        if (bikeByIdData) {
            setBikeData(bikeByIdData.data);
        }
    }, [bikeByIdData]);

    const updateBikeMutation = useMutation({
        mutationKey: ["UPDATE_BIKE"],
        mutationFn(payload) {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });
            return axios.put(`http://localhost:8080/bike/update/${id}`, formData);
        },
        onSuccess() {
            navigate("/dashboard/bike/list");
        }
    });

    const onSubmit = (formData) => {
        const mergedData = {
            ...bikeData,
            ...formData,
        };
        if (updateBikeMutation) {
            updateBikeMutation.mutate(mergedData);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/bike/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Brand</FormLabel>
                        <Textarea defaultValue={bikeData?.makeBrand} {...register("makeBrand")} />
                        <p>{errors?.makeBrand?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Model</FormLabel>
                        <Textarea defaultValue={bikeData?.model} {...register("model")} />
                        <p>{errors?.model?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Year</FormLabel>
                        <Textarea defaultValue={bikeData?.year} {...register("year")} />
                        <p>{errors?.year?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea defaultValue={bikeData?.description} {...register("description")} />
                        <p>{errors?.description?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Choose New Image: <Input type="file" {...register("image")} /></FormLabel>
                        <FormLabel><small><strong>Current Image Name :</strong> {bikeData?.image} </small></FormLabel>
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
                    Update Bike
                </Button>
            </form>
        </Box>
    );
}

export default UpdateBike;
