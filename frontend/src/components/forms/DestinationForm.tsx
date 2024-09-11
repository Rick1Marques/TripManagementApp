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

type EditDestinationFormProps = {
    index?: number,
    edit?: boolean,
    destinationType: string
}

export default function DestinationForm({index,edit, destinationType}: EditDestinationFormProps) {
    const [open, setOpen] = React.useState(false);
    const [destinationData, setDestinationData] = useState<InputData>(emptyInputData)

    const { handleEditTripEventDestination, handleAddTripEventDestination} = useContext(ItineraryContext)

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
            <Button variant="outlined" onClick={handleClickOpen}>
                {edit ? "Edit" : "Add Destination"}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const typedUpdatedDestination : DestinationTyped = {...destinationData, type: destinationType}

                        if(index){
                        handleEditTripEventDestination(index, typedUpdatedDestination)
                        } else {
                            handleAddTripEventDestination(destinationData)
                        }
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Edit {`${destinationType}`}</DialogTitle>
                <DialogContent>
                    <CountryCityDateInputs handleInputChange={(_id, data) => handleDestinationChange(data)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}