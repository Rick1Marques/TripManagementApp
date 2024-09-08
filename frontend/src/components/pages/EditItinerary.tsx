import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import EventForm from "../EventForm.tsx";
import {Trip} from "../../model/Trip.ts";
import {TripEvent} from "../../model/TripEvent.ts";
import {DestinationTyped} from "../../model/DestinationTyped.ts";
import {TripEventTyped} from "../../model/TripEventTyped.ts";
import TripTimeLine from "../TimeLine.tsx";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type EditItineraryProps = {
    dataTimeLine: (DestinationTyped | TripEventTyped)[],
    tripData: Trip,
    handleChangeEventsArray: (tripEvent: TripEvent) => void;
}

export default function EditItinerary({dataTimeLine, tripData, handleChangeEventsArray}: EditItineraryProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit Itinerary
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Edit Events"}</DialogTitle>
                <DialogContent>

                    <TripTimeLine dataTimeLine={dataTimeLine}/>
                    <EventForm tripData={tripData} handleChangeEventsArray={handleChangeEventsArray}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
