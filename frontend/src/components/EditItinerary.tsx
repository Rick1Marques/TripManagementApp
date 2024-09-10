import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import EventForm from "./forms/EventForm.tsx";
import TripTimeLine from "./TripTimeLine.tsx";
import axios from "axios";
import {useContext} from "react";
import {ItineraryContext} from "../store/itinerary-context.tsx";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
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

    async function putTripAddEvent() {
        try {
            const response = await axios.put(`/api/trips`, tripData)
            console.log("Event edited with success!", response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    async function handleSave() {
        await putTripAddEvent()
        setOpen(false)
    }


    const handleCloseCancel = () => {
        window.location.reload()
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
                onClose={handleCloseCancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Edit Itinerary"}</DialogTitle>
                <DialogContent>
                    <TripTimeLine edit={true}/>
                    <EventForm/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
