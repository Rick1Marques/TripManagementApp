import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import {getOrdinalSuffix} from "../../util/getOrdinalSuffix.ts";
import {Box, FormControl, FormLabel, TextField, Typography} from '@mui/material';
import axios from "axios";
import CountryCityDateInputs from "../CountryCityDateInputs.tsx";
import {emptyInputData, InputData} from "../../model/CountryCityDateData.ts";
import {useNavigate} from "react-router-dom";
import {Trip} from "../../model/Trip.ts";
import {updateTrip} from "../../util/updateTrip.ts";
import {Destination} from "../../model/Destination.ts";
import {TripEvent} from "../../model/TripEvent.ts";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

type DestinationsInput = {
    id: number,
    type: string,
    inputData: InputData
}

type TripFormProps = {
    edit?: boolean,
    trip?: Trip
}

export default function TripForm({edit, trip}: TripFormProps) {
    const [open, setOpen] = React.useState(false);
    const [startingPoint, setStartingPoint] = useState<InputData>(emptyInputData)
    const [home, setHome] = useState<InputData>(emptyInputData)
    const [destinationsInputs, setDestinationsInputs] = useState<DestinationsInput[]>([{
        id: Date.now(),
        type: "1st destination",
        inputData: emptyInputData
    }])
    const [destinationCounter, setDestinationCounter] = useState(1)
    const [formData, setFormData] = useState<Trip>()

    const loggedUserId = localStorage.getItem("loggedUserId")

    const navigate = useNavigate()

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
            prevState.map((destination) => destination.id === id
                ? {...destination, inputData: inputData}
                : destination
            )
                .sort((a, b) => {
                    const dateA = new Date(a.inputData.date)
                    const dateB = new Date(b.inputData.date)

                    return dateA.getTime() - dateB.getTime();
                })
                .map((destination, index) => ({
                    ...destination,
                    type: `${getOrdinalSuffix(index + 1)} destination`
                }))
        );
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
        async function postTrip() {
            try {
                const response = await axios.post(`/api/user/${loggedUserId}/trips`, formData)
                console.log("Trip added with success!", response.data)
                navigate("/my-trips")
            } catch (err) {
                console.log(err)
            }
        }

        if (formData) {
            postTrip()
        }
    }, [formData])


    return (
        <Box>
            <Button variant="text"
                    onClick={handleClickOpen}
            >
                {!edit ? <AddIcon/> : <EditIcon/>}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);

                        if (!edit) {
                            const combinedDestinations = [
                                {id: Date.now(), type: 'Starting Point', inputData: startingPoint},
                                ...destinationsInputs,
                                {id: Date.now(), type: 'Home', inputData: home}
                            ];
                            const destinations = combinedDestinations.map(destination => destination.inputData)
                            const newTrip: Trip = {
                                title: formData.get('title') as string,
                                description: formData.get('description') as string,
                                reason: formData.get('reason') as string,
                                destinations: destinations as Destination[],
                                events: [],
                                id: ""
                            }
                            setFormData(newTrip)
                        } else {
                            const updatedTrip: Trip = {
                                ...trip,
                                title: formData.get('title') as string,
                                description: formData.get('description') as string,
                                reason: formData.get('reason') as string,
                                destinations: trip?.destinations as Destination[],
                                events: trip?.events as TripEvent[],
                                id: ""
                            }
                            updateTrip(updatedTrip);
                            window.location.reload()
                        }
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{!edit ? "Add New Trip" : "General Information"}</DialogTitle>
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
                            defaultValue={trip?.title || ""}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="reason"
                            name="reason"
                            label="Reason"
                            type="text"
                            variant="outlined"
                            defaultValue={trip?.reason || ""}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="description"
                            label="Description"
                            name="description"
                            multiline
                            maxRows={4}
                            defaultValue={trip?.description || ""}
                        />
                    </FormControl>

                    {!edit &&
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
                                                       minDate={startingPoint?.date}
                                                       maxDate={home?.date}
                                                       key={destination.id}
                                                       id={destination.id}
                                />
                            )}
                            <CountryCityDateInputs name="Home"
                                                   handleInputChange={(_id, data) => handleHomeChange(data)}
                            />
                            <Button onClick={handleAddNewInput}>Add Destination</Button>
                        </FormControl>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{!edit ? "Add" : "Save"}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
