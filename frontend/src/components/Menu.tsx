import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import LanguageIcon from '@mui/icons-material/Language';
import axios from "axios";
import {Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Menu() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    async function handleLogout() {
        try {
            await axios.post("/api/auth/logout")
            localStorage.removeItem("loggedUserId");
            console.log("Logged out")
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }

    const handleNavigation = (path: string) => {
        navigate(path);
        setOpen(false);
    };

    const DrawerList = (
        <Stack sx={{ width: 250, height: "100%", justifyContent: "space-between" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[
                    { text: 'Home', icon: <HomeIcon />, path: '/home' },
                    { text: 'My trips', icon: <CardTravelIcon />, path: '/my-trips' },
                    { text: 'Map', icon: <LanguageIcon />, path: '/map' }
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => handleNavigation(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            <Divider />
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Stack>
    );

    return (
        <div>
            <Button sx={{position: "absolute", zIndex:"1"}} onClick={toggleDrawer(true)}><MenuIcon/></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
