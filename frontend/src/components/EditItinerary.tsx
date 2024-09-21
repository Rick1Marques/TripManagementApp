import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {useContext} from "react";
import {ItineraryContext} from "../store/itinerary-context.tsx";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import {Stack} from "@mui/material";
import TripTimeLine from "./TripTimeLine.tsx";
import EventForm from "./forms/EventForm.tsx";
import DestinationForm from "./forms/DestinationForm.tsx";
import DialogContent from "@mui/material/DialogContent";
import {SpeedDial, SpeedDialAction} from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import {updateTrip} from "../util/updateTrip.ts";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditItinerary() {
    const [open, setOpen] = React.useState(false);

    const {
        tripData,
    } = useContext(ItineraryContext)

    const handleClickOpen = () => {
        setOpen(true)
    };

    async function handleSave() {
        if (tripData) {
            await updateTrip(tripData)
        }
        setOpen(false)
    }

    const handleCloseCancel = () => {
        window.location.reload()
        setOpen(false);
    };

    const actions = [
        {icon: <EventForm/>, name: 'Event'},
        {icon: <DestinationForm />, name: 'Destination'},
    ];

    return (
        <React.Fragment>
            <Button variant="text" onClick={handleClickOpen}>
                <ModeEditOutlineRoundedIcon/>
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleCloseCancel}
                TransitionComponent={Transition}
                scroll="paper"
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <Stack width="100%" direction="row" justifyContent="space-between">
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleCloseCancel}
                                aria-label="close"
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers={true}>
                    <Typography align="center" variant="h4" gutterBottom mt="0.5rem">
                        Edit Itinerary
                    </Typography>
                    <TripTimeLine fullData={true} edit={true}/>
                    <Stack direction="row" justifyContent="space-between">
                        <SpeedDial
                            ariaLabel="SpeedDial add"
                            icon={<AddIcon fontSize="large"/>}
                            direction="right"
                            FabProps={{
                                sx: {
                                    width: "3rem",
                                    height: "3rem",
                                },
                            }}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                />
                            ))}
                        </SpeedDial>
                        <Button variant="text" onClick={handleSave}>
                            <SaveIcon fontSize="large"/>
                        </Button>
                    </Stack>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
