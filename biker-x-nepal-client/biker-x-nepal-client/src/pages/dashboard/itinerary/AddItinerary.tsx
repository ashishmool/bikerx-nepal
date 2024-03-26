import * as React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Typography,
    Textarea,
    Card,
    CardActions,
    CardOverflow,
    Divider,
} from '@mui/joy';
import {toast} from "react-toastify";

function AddItinerary() {
    const navigate = useNavigate();
    const [tourId, setTourId] = useState(''); // State variable to hold the tourId

    const useApiCall = useMutation({
        mutationKey: ["POST_ITINERARY_CREATE"],
        mutationFn: (payload) => {
            return axios.post("http://localhost:8080/itinerary/save", payload);
        },
        onSuccess() {
            toast.success('Itinerary Add Successful!');
            navigate("/dashboard/itinerary/list");
        }
    });

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const onSubmit = (data) => {
        const payload = {
            tourId: tourId,
            noOfDays: data.noOfDays,
            description: data.description,
        };
        useApiCall.mutate(payload);
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
                                <Typography level="title-md">Add New Itinerary</Typography>
                                <Typography level="body-sm">Provide details about the itinerary.</Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>
                                <FormControl>
                                    <FormLabel>Tour ID *</FormLabel>
                                    <Input
                                        type="text"
                                        {...register('tourId', { required: 'Tour ID is required' })}
                                        value={tourId}
                                        onChange={(e) => setTourId(e.target.value)}
                                    />
                                    <p>{errors?.tourId?.message}</p>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>No of Days *</FormLabel>
                                    <Input type="number" {...register('noOfDays', { required: 'No of Days is required' })} />
                                    <p>{errors?.noOfDays?.message}</p>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description *</FormLabel>
                                    <Textarea {...register('description', { required: 'Description is required' })}></Textarea>
                                    <p>{errors?.description?.message}</p>
                                </FormControl>
                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">Cancel</Button>
                                    <Button size="sm" variant="solid" type="submit">Save</Button>
                                </CardActions>
                            </CardOverflow>
                        </form>
                    </Card>
                </Stack>
            </Box>
        </>
    );
}

export default AddItinerary;
