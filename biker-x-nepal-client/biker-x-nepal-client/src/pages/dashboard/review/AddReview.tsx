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
    Textarea,
    Switch
} from '@mui/joy';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import {toast} from "react-toastify";

function AddReview() {
    const navigate = useNavigate();

    const useApiCall = useMutation({
        mutationKey: ["POST_TESTIMONIAL_CREATE"],
        mutationFn: (payload) => {
            console.log(payload);
            return axios.post("http://13.48.249.115:8080/testimonial/save", payload);
        },
        onSuccess() {
            toast.success('Added Review Successfully');
            navigate("/dashboard/testimonial/list");
        }
    });

    const { register, handleSubmit, formState } = useForm();

    const { errors } = formState;

    const onSubmit = (data) => {
        useApiCall.mutate(data);
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
                                <Typography level="title-md">Add New Testimonial</Typography>
                                <Typography level="body-sm">
                                    Provide details about the review.
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Review Title *</FormLabel>
                                        <Input type="text" {...register("title", { required: "Review Title" })} />
                                        <p>{errors?.title?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Describe Your Experience *</FormLabel>
                                        <Textarea rows={4} {...register("description", { required: "Description is required" })} />
                                        <p>{errors?.description?.message}</p>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Full Name *</FormLabel>
                                        <Input type="text" {...register("fullName", { required: "Full Name is required" })} />
                                        <p>{errors?.fullName?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Designation *</FormLabel>
                                        <Input type="text" {...register("designation", { required: "Designation is required" })} />
                                        <p>{errors?.designation?.message}</p>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Company *</FormLabel>
                                        <Input type="text" {...register("company", { required: "Company is required" })} />
                                        <p>{errors?.company?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Review Rating (0 - 5)</FormLabel>
                                        <Input type="number" {...register("reviewRating", { required: "Review Rating is required" })} />
                                        <p>{errors?.reviewRating?.message}</p>
                                    </Stack>
                                </Stack>
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

export default AddReview;
