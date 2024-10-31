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
    Textarea,
    Card,
    CardActions,
    CardOverflow,
    Divider,
    Button,
    Typography,
} from '@mui/joy';
import { toast } from 'react-toastify';

function AddInformation() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const addInformationMutation = useMutation({
        mutationKey: ["ADD_INFORMATION"],
        mutationFn(payload) {
            return axios.post("http://localhost:8080/information/save", payload);
        },
        onSuccess() {
            toast.success("Information added successfully!");
            navigate("/dashboard/information/list");
        },
        onError(err) {
            toast.error("Failed to add information: " + (err.response?.data?.message || "An error occurred"));
        }
    });

    const onSubmit = (formData) => {
        addInformationMutation.mutate(formData);
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '600px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Add New Information</Typography>
                            <Typography level="body-sm">
                                Provide details for the information entry.
                            </Typography>
                        </Box>
                        <Divider />
                        <Stack spacing={2} sx={{ my: 1 }}>
                            <Stack spacing={1}>
                                <FormLabel>Title *</FormLabel>
                                <Input
                                    {...register("title", { required: "Title is required" })}
                                />
                                <p>{errors?.title?.message}</p>
                            </Stack>
                            <Stack spacing={1}>
                                <FormLabel>Description *</FormLabel>
                                <Textarea
                                    {...register("description", { required: "Description is required" })}
                                />
                                <p>{errors?.description?.message}</p>
                            </Stack>
                        </Stack>

                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button
                                    size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={() => navigate("/dashboard/information/list")}
                                >
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

export default AddInformation;
