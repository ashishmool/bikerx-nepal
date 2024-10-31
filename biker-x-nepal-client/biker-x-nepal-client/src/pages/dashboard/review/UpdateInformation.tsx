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
    Card,
    CardActions,
    CardOverflow,
    Divider,
} from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-toastify";

function UpdateInformation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [informationData, setInformationData] = useState(null);
    const { register, handleSubmit, setValue, formState } = useForm();
    const { errors } = formState;

    const { data: informationByIdData, isLoading } = useQuery({
        queryKey: ["GET_INFORMATION_BY_ID", id],
        queryFn() {
            return axios.get(`http://localhost:8080/information/getById/${id}`);
        },
        enabled: !!id,
    });

    useEffect(() => {
        if (informationByIdData) {
            setInformationData(informationByIdData.data);
            setValue("title", informationByIdData.data.title);
            setValue("description", informationByIdData.data.description);
        }
    }, [informationByIdData, setValue]);

    const updateInformationMutation = useMutation({
        mutationKey: ["UPDATE_INFORMATION"],
        mutationFn(payload) {
            return axios.put(`http://localhost:8080/information/update/${id}`, payload);
        },
        onSuccess() {
            toast.success("Information updated successfully!");
            navigate("/dashboard/information/list");
        },
        onError(err) {
            toast.error("Failed to update information: " + (err.response?.data?.message || "An error occurred"));
        }
    });

    const onSubmit = (formData) => {
        updateInformationMutation.mutate(formData);
    };

    if (isLoading) return <p>Loading...</p>;

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
                <IconButton onClick={() => navigate("/dashboard/information/list")} aria-label="back">
                    <ArrowBackIcon /> Go Back
                </IconButton>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Update Information</Typography>
                            <Typography level="body-sm">
                                Modify the information entry as needed.
                            </Typography>
                        </Box>
                        <Divider />
                        <Stack spacing={2} sx={{ my: 1 }}>
                            <Stack spacing={1}>
                                <FormLabel>Title *</FormLabel>
                                <Input
                                    {...register("title", { required: "Title is required" })}
                                    defaultValue={informationData?.title}
                                />
                                <p>{errors?.title?.message}</p>
                            </Stack>
                            <Stack spacing={1}>
                                <FormLabel>Description *</FormLabel>
                                <Textarea
                                    {...register("description", { required: "Description is required" })}
                                    defaultValue={informationData?.description}
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
                                    Update
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
}

export default UpdateInformation;
