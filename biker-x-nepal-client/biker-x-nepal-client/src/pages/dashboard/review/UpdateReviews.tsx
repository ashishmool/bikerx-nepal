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
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {toast} from "react-toastify";

function UpdateReviews() {
    const { id } = useParams();
    console.log("Information ID:", id);

    const navigate = useNavigate();
    const [informationData, setInformationData] = useState(null);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const { data: informationByIdData, isLoading } = useQuery({
        queryKey: ["GET_INFORMATION_BY_ID", id],
        queryFn() {
            return axios.get(`http://localhost:8080/information/getById/${id}`);
        },
        enabled: !!id
    });

    useEffect(() => {
        if (informationByIdData) {
            setInformationData(informationByIdData.data);
        }
    }, [informationByIdData]);

    const updateInformationMutation = useMutation({
        mutationKey: ["UPDATE_INFORMATION"],
        mutationFn(payload) {
            return axios.put(`http://localhost:8080/information/update/${id}`, payload);
        },
        onSuccess() {
            toast.success('Review Updated Successfully)')
            navigate("/dashboard/informations/manage");
        }
    });

    const onSubmit = (formData) => {
        const mergedData = {
            ...informationData,
            ...formData,
        };
        if (updateInformationMutation) {
            updateInformationMutation.mutate(mergedData);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/information/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Textarea defaultValue={informationData?.title} {...register("title")} />
                        <p>{errors?.title?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea defaultValue={informationData?.description} {...register("description")} />
                        <p>{errors?.description?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Textarea defaultValue={informationData?.fullName} {...register("fullName")} />
                        <p>{errors?.fullName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Designation</FormLabel>
                        <Textarea defaultValue={informationData?.designation} {...register("designation")} />
                        <p>{errors?.designation?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Company</FormLabel>
                        <Textarea defaultValue={informationData?.company} {...register("company")} />
                        <p>{errors?.company?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Review Rating</FormLabel>
                        <Textarea defaultValue={informationData?.reviewRating} {...register("reviewRating")} />
                        <p>{errors?.reviewRating?.message}</p>
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
                    Update Information
                </Button>
            </form>
        </Box>
    );
}

export default UpdateReviews;
