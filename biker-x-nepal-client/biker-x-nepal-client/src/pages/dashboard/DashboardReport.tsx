import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LandscapeIcon from '@mui/icons-material/Landscape'
import GradingIcon from '@mui/icons-material/Grading'
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import {Animation} from "@mui/icons-material";
import AnimationPage from "../components/AnimationPage.tsx";

function DashboardReport() {
    const [data, setData] = useState({
        tours: 0,
        bikes: 0,
        testimonials: 0,
        users: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const toursResponse = await axios.get("http://localhost:8080/tour/getAll");
                const bikesResponse = await axios.get("http://localhost:8080/bike/getAll");
                const testimonialsResponse = await axios.get("http://localhost:8080/testimonial/getAll");
                const usersResponse = await axios.get("http://localhost:8080/system-user/getAllWithoutPassword");

                setData({
                    tours: toursResponse.data.length,
                    bikes: bikesResponse.data.length,
                    testimonials: testimonialsResponse.data.length,
                    users: usersResponse.data.length
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Stack
                spacing={4}
                direction="row"
                sx={{
                    display: 'flex',
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                    justifyContent: 'space-between'
                }}
            >
                <Card sx={{ width: 200, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            <LandscapeIcon /> Tours
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.tours}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: 200, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            <TwoWheelerIcon /> Bikes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>{data.bikes}</strong>
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: 200, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            <GradingIcon/> Reviews
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.testimonials}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: 200, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            <GroupRoundedIcon/> Users
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.users-1}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
            <Stack
                spacing={4}
                direction="row"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start', // Align to the left
                    marginLeft: 0, // Set left margin to 0
                }}
            >
                <AnimationPage />
            </Stack>
        </div>
    );
}

export default DashboardReport;
