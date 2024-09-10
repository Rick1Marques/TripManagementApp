import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import {getOrdinalSuffix} from "../../util/getOrdinalSuffix.ts";
import {FormControl, FormLabel, TextField, Typography} from '@mui/material';
import axios from "axios";
import CountryCityDateInputs from "../CountryCityDateInputs.tsx";
import {emptyInputData, InputData} from "../../model/CountryCityDateData.ts";

type DestinationsInput = {
    id: number,
    type: string,
    inputData: InputData
}

export default function TripForm() {
    const [open, setOpen] = React.useState(false);
    const [destinationsInputs, setDestinationsInputs] = useState<DestinationsInput[]>([{
        id: Date.now(),
        type: "1st destination",
        inputData: emptyInputData
    }])
    const [destinationCounter, setDestinationCounter] = useState(1)
    const [startingPoint, setStartingPoint] = useState<InputData>(emptyInputData)
    const [home, setHome] = useState<InputData>(emptyInputData)
    const [formData, setFormData] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleStartingPointChange(data: InputData) {
        setStartingPoint(data);
    }

    function handleHomeChange(data: InputData) {
        setHome(data);
    }

    function handleDestinationsInputsChange(id: number | null, inputData: InputData) {
        setDestinationsInputs(prevState =>
            prevState.map(destination => destination.id === id
                ? {...destination, inputData: inputData} : destination)
        )
    }

    function updateDestinationTypes(destinations: { id: number, type: string, inputData: InputData }[]) {
        return destinations.map((destination, index) => ({
            ...destination,
            type: `${getOrdinalSuffix(index + 1)} destination`,
        }));
    }

    function handleAddNewInput() {
        setDestinationCounter(prevCount => prevCount + 1);
        setDestinationsInputs(prevState => {
            const updatedDestinations = [
                ...prevState,
                {
                    id: Date.now(),
                    type: `${getOrdinalSuffix(destinationCounter + 1)} destination`,
                    inputData: emptyInputData
                }
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


    useEffect(() => {
        async function postTrip(){
            try {
            const response = await axios.post("/api/trips", formData)
                console.log("Trip added with success!", response.data)

            } catch (err) {
                console.log(err)
            }
        }
if(formData){
        postTrip()
}
    }, [formData])

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
                        const combinedDestinations = [
                            {id: Date.now(), type: 'Starting Point', inputData: startingPoint},
                            ...destinationsInputs,
                            {id: Date.now(), type: 'Home', inputData: home}
                        ];
                        const destinations = combinedDestinations.map(destination => destination.inputData)

                        const newTrip = {
                            title: formData.get('title'),
                            description: formData.get('description'),
                            reason: formData.get('reason'),
                            destinations: destinations,
                            events: []
                        }
                        setFormData(newTrip)
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
                            id="title"
                            name="title"
                            label="Title"
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
                            required
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
                        <CountryCityDateInputs name="Starting Point"
                                                  handleInputChange={(_id, data) => handleStartingPointChange(data)}
                        />
                        {destinationsInputs.map((destination) =>
                            <CountryCityDateInputs name={destination.type}
                                                      handleInputChange={handleDestinationsInputsChange}
                                                      handleDeleteInput={handleDeleteInput}
                                                      key={destination.id}
                                                      id={destination.id}
                            />
                        )}
                        <CountryCityDateInputs name="Home"
                                                  handleInputChange={(_id, data) => handleHomeChange(data)}
                        />
                        <Button onClick={handleAddNewInput}>Add Destination</Button>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add new Trip</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
