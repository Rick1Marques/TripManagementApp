import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CountryCityDateInputs from "../CountryCityDateInputs.tsx";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip} from "@mui/material";
import {toCamelCase} from "../../util/formatting.ts";
import {Category} from "../../model/Category.ts";
import {emptyInputData, InputData} from "../../model/CountryCityDateData.ts";
import {TripEvent} from "../../model/TripEvent.ts";
import {useContext, useState} from "react";
import {TripEventTyped} from "../../model/TripEventTyped.ts";
import {ItineraryContext} from "../../store/itinerary-context.tsx";
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";

const categoryOpt = ["RESTAURANT", "COFFEE", "BAR", "BAKERY", "THINGS_TO_DO", "EVENT", "HOTEL", "TRANSPORT", "MEETING", "NOTE"]

type EventFormProps = {
    index?: number,
    edit?: boolean,
    tripEventTyped?: TripEventTyped
}

export default function EventForm({index, edit, tripEventTyped}: EventFormProps) {
    const {handleAddTripEventDestination, handleEditTripEventDestination,} = useContext(ItineraryContext)

    const [open, setOpen] = React.useState(false);

    const [category, setCategory] = useState<Category>()
    const [countryCityDateData, setCountryCityDateData] = useState<InputData>(emptyInputData)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChangeCategory(event: SelectChangeEvent) {
        setCategory(event.target.value as Category)
    }

    function handleCountryCityDateChange(data: InputData) {
        setCountryCityDateData(data)
    }

    return (
        <React.Fragment>
            <Button variant="text" onClick={handleClickOpen}>
                {edit ? <EditIcon fontSize="small"/> :
                    <Tooltip title="Event">
                        <EventIcon fontSize="medium"/>
                    </Tooltip>}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);

                        const tripEvent: TripEvent = {
                            title: formData.get("title") as string,
                            category: formData.get("category") as Category,
                            description: formData.get("description")  as string,
                            address: formData.get("address")  as string,
                            country: countryCityDateData.country,
                            countryIso: countryCityDateData.countryIso,
                            countryFlag: countryCityDateData.countryFlag,
                            city: countryCityDateData.city,
                            date: countryCityDateData.date,
                            id: ""
                        }
                        if (!edit) {
                            handleAddTripEventDestination(tripEvent)
                        } else if (edit && typeof index === 'number') {
                            const tripEventTyped: TripEventTyped = {
                                ...tripEvent,
                                type: "event"
                            };
                            handleEditTripEventDestination(index, tripEventTyped);
                        }

                        handleClose();
                    },
                }}
            >
                <DialogTitle>{edit ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogContent>
                    <FormControl sx={{m: "5% 0"}} fullWidth>
                        <TextField
                            fullWidth
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            variant="standard"
                            defaultValue={tripEventTyped?.title || ''}
                        />

                        <FormControl sx={{m: "5% 0"}} fullWidth>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                name="category"
                                value={category}
                                label="Category"
                                onChange={handleChangeCategory}
                                defaultValue={tripEventTyped?.category || ''}
                            >
                                {categoryOpt.map(opt => <MenuItem key={opt} value={opt}>{toCamelCase(opt)}</MenuItem>)}
                            </Select>

                        </FormControl>

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            variant="standard"
                            defaultValue={tripEventTyped?.description || ''}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="address"
                            name="address"
                            label="Address"
                            type="text"
                            variant="standard"
                            defaultValue={tripEventTyped?.address || ''}
                        />
                        <CountryCityDateInputs name=""
                                               id={0}
                                               handleInputChange={(_id, data) => handleCountryCityDateChange(data)}
                                               tripEventTyped={tripEventTyped}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{edit ? "Edit Event" : "Add Event"}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
