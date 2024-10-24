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
import BearAnimationBike from "../components/BearAnimationBike.tsx";
import DashboardCalendar from "../components/DashboardCalendar.tsx";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


function DashboardReport() {
    const [data, setData] = useState({
        tours: 0,
        bikes: 0,
        informations: 0,
        users: 0
    });
    const [tourDates, setTourDates] = useState<Date[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const toursResponse = await axios.get("http://localhost:8080/tour/getAll");
                const bikesResponse = await axios.get("http://localhost:8080/bike/getAll");
                const informationsResponse = await axios.get("http://localhost:8080/information/getAll");
                const usersResponse = await axios.get("http://localhost:8080/system-user/getAllWithoutPassword");

                setData({
                    tours: toursResponse.data.length,
                    bikes: bikesResponse.data.length,
                    informations: informationsResponse.data.length,
                    users: usersResponse.data.length
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchTourDates = async () => {
            try {
                const response = await axios.get("http://localhost:8080/tour/getAll");
                const tourDates = response.data.flatMap((tour: any) => {
                    const startDate = new Date(tour.startDate)-1;
                    const endDate = new Date(tour.endDate);
                    const datesBetween = [];
                    let currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        datesBetween.push(new Date(currentDate));
                        currentDate.setDate(currentDate.getDate()+1);
                    }
                    console.log('Dates Between',datesBetween);
                    return datesBetween;
                });
                setTourDates(tourDates);
            } catch (error) {
                console.error("Error fetching tour dates:", error);
            }
        };

        fetchData();
        fetchTourDates();
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
                        <Typography variant="h6" component={Link} to="/dashboard/tour/list">
                            <LandscapeIcon /> Tours
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.tours}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: 200, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" component={Link} to="/dashboard/bike/list">
                            <TwoWheelerIcon /> Bikes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>{data.bikes}</strong>
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: 200, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" component={Link} to="/dashboard/information/list">
                            <GradingIcon/> Reviews
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.informations}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ width: 200, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h6" component={Link} to="/dashboard/user/list">
                            <GroupRoundedIcon/> Users
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.users}
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
                    marginTop: -8, // Reduce the marginTop to decrease the gap
                    marginBottom: -8
                }}
            >
                <div>
                    <DashboardCalendar tourDates={tourDates} />
                </div>
                <BearAnimationBike />
            </Stack>


        </div>
    );
}

export default DashboardReport;
