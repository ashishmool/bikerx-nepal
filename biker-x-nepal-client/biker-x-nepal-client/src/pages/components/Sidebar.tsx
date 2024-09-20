import React, { useState, useEffect } from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useLocation } from 'react-router-dom';
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import MapIcon from '@mui/icons-material/Map';

const handleLogout = () => {
    localStorage.clear();
    console.log('Token Destroyed::',localStorage.getItem("accessToken"));
    window.location.href = '/';

};


function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);


  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/');
    };

    const [countBookings, setCountBookings] = useState(0);

    useEffect(() => {
        // Fetch bookings with status PENDING
        const fetchPendingBookings = async () => {
            try {
                const response = await fetch("http://localhost:8080/booking/getAll");
                if (response.ok) {
                    const bookings = await response.json();
                    console.log('All Bookings', bookings);
                    // Filter bookings where status is "PENDING"
                    const pendingBookings = bookings.filter(booking => booking.paymentStatus === "PENDING");
                    console.log('Pending Bookings', pendingBookings);
                    setCountBookings(pendingBookings.length);
                } else {
                    console.error("Failed to fetch pending bookings");
                }
            } catch (error) {
                console.error("Error fetching pending bookings:", error);
            }
        };


        fetchPendingBookings();
    }, []);


    return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm" onClick={handleNavigateHome}>
          <TwoWheelerIcon />
        </IconButton>
        <Typography level="title-lg">BikerXNepal</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >

          <ListItem>
            <ListItemButton role="menuitem"
                            component="a"
                            href="/dashboard/home"
                            selected={location.pathname === '/dashboard/home'}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Dashboard </Typography>

              </ListItemContent>
            </ListItemButton>

          </ListItem>

            <ListItem>
                <ListItemButton role="menuitem"
                                component="a"
                                href="/dashboard/booking/list"
                                selected={location.pathname === '/dashboard/booking/list'}>
                    <BookmarksIcon />
                    <ListItemContent>
                        <Typography level="title-sm">Bookings </Typography>

                    </ListItemContent>
                    {countBookings > 0 && (
                        <Chip size="sm" color="primary" variant="solid">
                            {countBookings} <small>(Pending)</small>
                        </Chip>
                    )}
                </ListItemButton>

            </ListItem>

          <ListItem nested>
            <Toggler
              defaultExpanded
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Tours</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <ListItemButton
                      role="menuitem"
                      component="a"
                      href="/dashboard/tour/create"
                      selected={location.pathname === '/dashboard/tour/create'}
                  >Create New Tour</ListItemButton>
                </ListItem>
                  <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton
                          role="menuitem"
                          component="a"
                          href="/dashboard/tour/list"
                          selected={location.pathname === '/dashboard/tour/list'}
                      >Manage Tours</ListItemButton>
                  </ListItem>
              </List>
            </Toggler>
          </ListItem>

            <ListItem nested>
                <Toggler
                    defaultExpanded
                    renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                            <MapIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Itineraries</Typography>
                            </ListItemContent>
                            <KeyboardArrowDownIcon
                                sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                            />
                        </ListItemButton>
                    )}
                >
                    <List sx={{ gap: 0.5 }}>
                        <ListItem>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/itinerary/add"
                                selected={location.pathname === '/dashboard/itinerary/add'}
                            >Add New Itinerary</ListItemButton>
                        </ListItem>
                        <ListItem sx={{ mt: 0.5 }}>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/itinerary/list"
                                selected={location.pathname === '/dashboard/itinerary/list'}
                            >Manage Itinerary</ListItemButton>
                        </ListItem>

                    </List>
                </Toggler>
            </ListItem>

            <ListItem nested>
                <Toggler
                    defaultExpanded
                    renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                            <SportsMotorsportsIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Bikes</Typography>
                            </ListItemContent>
                            <KeyboardArrowDownIcon
                                sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                            />
                        </ListItemButton>
                    )}
                >
                    <List sx={{ gap: 0.5 }}>
                        <ListItem>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/bike/add"
                                selected={location.pathname === '/dashboard/bike/add'}
                            >Add New Bike</ListItemButton>
                        </ListItem>
                        <ListItem sx={{ mt: 0.5 }}>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/bike/list"
                                selected={location.pathname === '/dashboard/bike/list'}
                            >Manage Bikes</ListItemButton>
                        </ListItem>

                    </List>
                </Toggler>
            </ListItem>

            <ListItem nested>
                <Toggler
                    defaultExpanded
                    renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                            <QuestionAnswerRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Reviews</Typography>
                            </ListItemContent>

                            <KeyboardArrowDownIcon
                                sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                            />
                        </ListItemButton>
                    )}
                >
                    <List sx={{ gap: 0.5 }}>
                        <ListItem>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/testimonial/add"
                                selected={location.pathname === '/dashboard/testimonial/add'}
                            >Add New Review</ListItemButton>
                        </ListItem>
                        <ListItem sx={{ mt: 0.5 }}>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/testimonial/list"
                                selected={location.pathname === '/dashboard/testimonial/list'}
                            >Manage Reviews</ListItemButton>
                        </ListItem>
                    </List>
                </Toggler>
            </ListItem>

            <ListItem nested>
                <Toggler
                    defaultExpanded
                    renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                            <GroupRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">System Users</Typography>
                            </ListItemContent>
                            <KeyboardArrowDownIcon
                                sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                            />
                        </ListItemButton>
                    )}
                >
                    <List sx={{ gap: 0.5 }}>
                        <ListItem sx={{ mt: 0.5 }}>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/user/list"
                                selected={location.pathname === '/dashboard/user/list'}
                            >Show System Users</ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton
                                role="menuitem"
                                component="a"
                                href="/dashboard/user/add"
                                selected={location.pathname === '/dashboard/user/add'}
                            >Add New User</ListItemButton>
                        </ListItem>
                    </List>
                </Toggler>
            </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://scontent.fktm7-1.fna.fbcdn.net/v/t39.30808-6/335908168_603305641661553_7305707784394286074_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=c6hfRpmIHwAAX9glMNw&_nc_ht=scontent.fktm7-1.fna&oh=00_AfCob5UWM8Nb_NgdKSy8_6a1RYo1KyYcloen592nCeCvjQ&oe=65CF32D6"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Ashish Mool</Typography>
          <Typography level="body-xs">bikerxnepal@gmail.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={handleLogout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
