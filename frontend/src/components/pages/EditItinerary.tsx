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
import axios from "axios";

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
    handleAddTripEvent: (tripEvent: TripEvent) => void,
    handleDeleteTripEvent: (tripEvents: TripEvent[]) => void,
    handleEditTripEvent: (index: number, updatedTripEvent: TripEventTyped) => void
}

export default function EditItinerary({
                                          dataTimeLine,
                                          tripData,
                                          handleAddTripEvent,
                                          handleDeleteTripEvent,
                                          handleEditTripEvent
                                      }: EditItineraryProps) {
    const [open, setOpen] = React.useState(false);


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
                <DialogTitle>{"Edit Events"}</DialogTitle>
                <DialogContent>

                    <TripTimeLine dataTimeLine={dataTimeLine} handleDeleteTripEvent={handleDeleteTripEvent}
                                  handleEditTripEvent={handleEditTripEvent}/>
                    <EventForm handleAddTripEvent={handleAddTripEvent}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
