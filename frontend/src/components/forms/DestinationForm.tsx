import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CountryCityDateInputs from "../CountryCityDateInputs.tsx";
import {useContext, useState} from "react";
import {emptyInputData, InputData} from "../../model/CountryCityDateData.ts";
import {ItineraryContext} from "../../store/itinerary-context.tsx";
import {DestinationTyped} from "../../model/DestinationTyped.ts";
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import EditIcon from '@mui/icons-material/Edit';

type EditDestinationFormProps = {
    index?: number,
    edit?: boolean,
    destinationTyped?: DestinationTyped
}

export default function DestinationForm({index, edit, destinationTyped}: EditDestinationFormProps) {
    const [open, setOpen] = React.useState(false);
    const [destinationData, setDestinationData] = useState<InputData>(emptyInputData)

    const {handleEditTripEventDestination, handleAddTripEventDestination} = useContext(ItineraryContext)

    function handleDestinationChange(data: InputData) {
        setDestinationData(data);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>

            <Button variant="text" onClick={handleClickOpen}>
                {edit ? <EditIcon fontSize="small"/> :
                    <AirlineStopsIcon fontSize="medium"/>}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const typedUpdatedDestination: DestinationTyped = {
                            ...destinationData,
                            type: destinationTyped?.type as string
                        }
                        if (!edit) {
                            handleAddTripEventDestination({...destinationData, id: ""})
                        } else {
                            handleEditTripEventDestination(index as number, typedUpdatedDestination)
                        }
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{edit ? `Edit ${destinationTyped?.type}` : "Add destination"}</DialogTitle>
                <DialogContent>
                    <CountryCityDateInputs destinationTyped={destinationTyped}
                                           handleInputChange={(_id, data) => handleDestinationChange(data)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}