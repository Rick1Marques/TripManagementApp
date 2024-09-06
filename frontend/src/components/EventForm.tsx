import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CountryCityDateInputs from "./CountryCityDateInputs.tsx";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {toCamelCase} from "../util/formatting.ts";
import {useEffect, useState} from "react";
import {Category} from "../model/Category.ts";
import {emptyInputData, InputData} from "../model/CountryCityDateData.ts";
import {Trip} from "../model/Trip.ts";
import axios from "axios";

const categoryOpt = ["RESTAURANT", "COFFEE", "BAR", "BAKERY", "THINGS_TO_DO", "EVENT", "HOTEL", "TRANSPORT", "MEETING", "NOTE"]

type EventFormProps = {
    tripData: Trip
}

export default function EventForm({tripData}: EventFormProps) {
    const [open, setOpen] = React.useState(false);

    const [category, setCategory] = useState<Category>()
    const [countryCityDateData, setCountryCityDateData] = useState<InputData>(emptyInputData)
    const [formData, setFormData] = useState()

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


    useEffect(() => {
        async function putTripAddEvent() {
            try {
                const updatedTrip = {
                    ...tripData,
                    events: [...tripData.events, formData]
                }
                const response = await axios.put(`/api/trips`, updatedTrip)
                console.log("Event added with success!", response.data)
            } catch (err) {
                console.log(err)
            }
        }

        if (formData) {
            putTripAddEvent();
        }
    }, [formData])


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Event
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);

                        const combinedData = {
                            title: formData.get("title"),
                            category: formData.get("category"),
                            description: formData.get("description"),
                            address: formData.get("address"),
                            country: countryCityDateData.country,
                            city: countryCityDateData.city,
                            date: countryCityDateData.date
                        }
                        setFormData(combinedData)
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Event</DialogTitle>
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
                            defaultValue=''
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
                            defaultValue=''
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
                            defaultValue=''
                        />
                        <CountryCityDateInputs name=""
                                               id={0}
                                               handleInputChange={(_id, data) => handleCountryCityDateChange(data)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add Event</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
