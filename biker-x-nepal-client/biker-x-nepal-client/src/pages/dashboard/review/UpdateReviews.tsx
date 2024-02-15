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

function UpdateReviews() {
    const { id } = useParams();
    console.log("Testimonial ID:", id);

    const navigate = useNavigate();
    const [testimonialData, setTestimonialData] = useState(null);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const { data: testimonialByIdData, isLoading } = useQuery({
        queryKey: ["GET_TESTIMONIAL_BY_ID", id],
        queryFn() {
            return axios.get(`http://localhost:8080/testimonial/getById/${id}`);
        },
        enabled: !!id
    });

    useEffect(() => {
        if (testimonialByIdData) {
            setTestimonialData(testimonialByIdData.data);
        }
    }, [testimonialByIdData]);

    const updateTestimonialMutation = useMutation({
        mutationKey: ["UPDATE_TESTIMONIAL"],
        mutationFn(payload) {
            return axios.put(`http://localhost:8080/testimonial/update/${id}`, payload);
        },
        onSuccess() {
            navigate("/dashboard/testimonials/manage");
        }
    });

    const onSubmit = (formData) => {
        const mergedData = {
            ...testimonialData,
            ...formData,
        };
        if (updateTestimonialMutation) {
            updateTestimonialMutation.mutate(mergedData);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <Box maxWidth="800px" mx="auto" px={{ xs: 2, md: 6 }} py={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => navigate("/dashboard/testimonial/list")} aria-label="back">
                <ArrowBackIcon /> Go Back
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Textarea defaultValue={testimonialData?.title} {...register("title")} />
                        <p>{errors?.title?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea defaultValue={testimonialData?.description} {...register("description")} />
                        <p>{errors?.description?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Textarea defaultValue={testimonialData?.fullName} {...register("fullName")} />
                        <p>{errors?.fullName?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Designation</FormLabel>
                        <Textarea defaultValue={testimonialData?.designation} {...register("designation")} />
                        <p>{errors?.designation?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Company</FormLabel>
                        <Textarea defaultValue={testimonialData?.company} {...register("company")} />
                        <p>{errors?.company?.message}</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Review Rating</FormLabel>
                        <Textarea defaultValue={testimonialData?.reviewRating} {...register("reviewRating")} />
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
                    Update Testimonial
                </Button>
            </form>
        </Box>
    );
}

export default UpdateReviews;
