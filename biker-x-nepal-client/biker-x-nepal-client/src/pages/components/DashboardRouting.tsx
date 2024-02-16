import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import ListTour from "../dashboard/tour/ListTour.tsx";
import {Route, Routes} from "react-router-dom";
import TourCreate from "../dashboard/tour/TourCreate.tsx";
import UpdateTour from "../dashboard/tour/UpdateTour.tsx";
import AddBike from "../dashboard/bike/AddBike.tsx";
import ListBike from "../dashboard/bike/ListBike.tsx";
import UpdateBike from "../dashboard/bike/UpdateBike.tsx";
import ListUser from "../dashboard/user/ListUser.tsx";
import AddNewUser from "../dashboard/user/AddNewUser.tsx";
import DashboardReport from "../dashboard/DashboardReport.tsx";
import AddReview from "../dashboard/review/AddReview.tsx";
import ListReviews from "../dashboard/review/ListReviews.tsx";
import UpdateReviews from "../dashboard/review/UpdateReviews.tsx";
import UpdateUser from "../dashboard/user/UpdateUser.tsx";
import ListBooking from "../dashboard/booking/ListBooking.tsx";

export default function DashboardRouting() {
    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon fontSize="sm" />}
                        sx={{ pl: 0 }}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            href="/"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon />
                        </Link>
                        <Link
                            underline="hover"
                            color="neutral"
                            href="/dashboard/home"
                            fontSize={12}
                            fontWeight={500}
                        >
                            Home
                        </Link>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            Dashboard
                        </Typography>
                    </Breadcrumbs>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        Welcome, {localStorage.getItem("role")}
                    </Typography>

                </Box>
            </Box>
            <Tabs
                defaultValue={0}
                sx={{
                    bgcolor: 'transparent',
                }}
            >
                <TabList
                    tabFlex={1}
                    size="sm"
                    sx={{
                        pl: { xs: 0, md: 4 },
                        justifyContent: 'left',
                        [`&& .${tabClasses.root}`]: {
                            fontWeight: '600',
                            flex: 'initial',
                            color: 'text.tertiary',
                            [`&.${tabClasses.selected}`]: {
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&::after': {
                                    height: '2px',
                                    bgcolor: 'primary.500',
                                },
                            },
                        },
                    }}
                >
                </TabList>
            </Tabs>

            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Routes>
                    <Route path="home" element={<DashboardReport />} />

                    <Route path="tour/create" element={<TourCreate />} />
                    <Route path="tour/list" element={<ListTour />} />
                    <Route path="tour/update/:id" element={<UpdateTour />} />

                    <Route path="bike/add" element={<AddBike />} />
                    <Route path="bike/list" element={<ListBike />} />
                    <Route path="bike/update/:id" element={<UpdateBike/>} />

                    <Route path="testimonial/add" element={<AddReview />} />
                    <Route path="testimonial/list" element={<ListReviews />} />
                    <Route path="testimonial/update/:id" element={<UpdateReviews/>} />

                    <Route path="user/list" element={<ListUser />} />
                    <Route path="user/add" element={<AddNewUser />} />
                    <Route path="user/update/:id" element={<UpdateUser />} />

                    <Route path="booking/list" element={<ListBooking />} />
                </Routes>
            </Stack>
        </Box>
    );
}
