import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import DashboardRouting from './DashboardRouting.tsx';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

function AdminDashboard() {
    console.log("Token Fetched:::",localStorage.getItem("accessToken"));

    const data = {
        tours: 10,
        bikes: 15,
        testimonials: 20,
        users: 30
    };

    return (

    <CssVarsProvider disableTransitionOnChange>

      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
            <DashboardRouting />


        </Box>

      </Box>


    </CssVarsProvider>
  );
}
export default AdminDashboard;
