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
    Textarea, Switch
} from '@mui/joy';
// import { InsertDriveFileRounded as InsertDriveFileRoundedIcon } from '@mui/icons-material';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import {toast} from "react-toastify";

function AddNewUser() {
    const navigate = useNavigate();

    const useApiCall = useMutation({
        mutationKey: ["POST_USER_CREATE"],
        mutationFn: (payload) => {
            console.log(payload);
            return axios.post("http://13.48.249.115:8080/system-user/save", payload);
        },
        onSuccess() {
            toast.success('User Added Successfully!');
            navigate("/dashboard/user/list");
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
                                <Typography level="title-md">Add New User</Typography>
                                <Typography level="body-sm">
                                    Provide details about the user.
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 1 }}>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>First Name *</FormLabel>
                                        <Input type="text" {...register("firstName", { required: "First Name is required" })} />
                                        <p>{errors?.firstName?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Last Name *</FormLabel>
                                        <Input type="text" {...register("lastName", { required: "Last Name is required" })} />
                                        <p>{errors?.lastName?.message}</p>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Email *</FormLabel>
                                        <Input type="email" {...register("email", { required: "Email is required" })} />
                                        <p>{errors?.email?.message}</p>
                                    </Stack>
                                    <Stack sx={{ flex: 1 }}>
                                        <FormLabel>Password *</FormLabel>
                                        <Input type="password" {...register("password", { required: "Password is required" })} />
                                        <p>{errors?.password?.message}</p>
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

export default AddNewUser;
