import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TripFormDestinationInput from "./TripFormDestinationInput.tsx";
import {useState} from "react";
import {getOrdinalSuffix} from "../util/getOrdinalSuffix.ts";
import {FormControl, FormLabel, TextField, Typography} from '@mui/material';

export default function TripForm() {
    const [open, setOpen] = React.useState(false);
    const [destinationsInputs, setDestinationsInputs] = useState([{id: Date.now(), type: `1st Destination`}])
    const [destinationCounter, setDestinationCounter] = useState(1)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function updateDestinationTypes(destinations: { id: number; type: string }[]) {
        return destinations.map((destination, index) => ({
            ...destination,
            type: `${getOrdinalSuffix(index + 1)} destination`,
        }));
    }

    function handleAddNewInput() {
        setDestinationCounter(prevCount => prevCount + 1); // Increment the counter
        setDestinationsInputs(prevState => {
            const updatedDestinations = [
                ...prevState,
                {id: Date.now(), type: `${getOrdinalSuffix(destinationCounter + 1)} destination`}
            ];
            return updateDestinationTypes(updatedDestinations);
        });
    }

    function handleDeleteInput(id: number) {
        setDestinationsInputs(prevState => {
            const updatedDestinations = prevState.filter(destination => destination.id !== id);
            return updateDestinationTypes(updatedDestinations);
        });
    }


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New Trip
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());


                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add New Trip</DialogTitle>
                <DialogContent>
                    <FormControl sx={{m: "5% 0"}} fullWidth>
                        <TextField
                            required
                            margin="dense"
                            id="titel"
                            name="titel"
                            label="Titel"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="reason"
                            name="reason"
                            label="Reason"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            name="description"
                            multiline
                            maxRows={4}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel>
                            <Typography variant="h5">Destinations</Typography>
                        </FormLabel>
                        <TripFormDestinationInput destinationType="Starting Point"/>
                        {destinationsInputs.map((destination) =>
                            <TripFormDestinationInput key={destination.id} handleDeleteInput={handleDeleteInput}
                                                      id={destination.id} destinationType={destination.type}/>
                        )}
                        <TripFormDestinationInput destinationType="Home"/>
                        <Button onClick={handleAddNewInput}>Add Destination</Button>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}