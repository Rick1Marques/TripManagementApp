import {
    Button,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, TextField,
    Typography
} from "@mui/material";
import {City, Country} from "country-state-city";
import {ChangeEvent, useEffect, useRef, useState} from "react";

type InputData = {
    country: string,
    city: string,
    coordinates: { lat: string, long: string }
    date: string,
}

type TripFormDestinationInputProps = {
    id?: number,
    destinationType: string
    handleDeleteInput?: (id: number) => void,
    handleInputChange?: (id: number, inputData: InputData) => void
}

export default function TripFormDestinationInput({
                                                     id,
                                                     destinationType,
                                                     handleDeleteInput,
                                                     handleInputChange
                                                 }: TripFormDestinationInputProps) {
    const countries = Country.getAllCountries()
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    const cities = City.getCitiesOfCountry(selectedCountry)
    const [selectedCity, setSelectedCity] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [coordinates, setCoordinates] = useState<{ lat: string, long:string }>({lat: "", long: ""})

    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const data: InputData = {
            country: selectedCountry,
            city: selectedCity,
            coordinates,
            date: selectedDate,
        };

        if (handleInputChange && id !== undefined) {
            handleInputChange(id, data);
        }
    }, [selectedCountry, selectedCity, selectedDate, coordinates, id]);


    function handleChangeSelectedCountry(event: SelectChangeEvent<string>) {
        setSelectedCountry(event.target.value)
    }

    function handleChangeSelectedDate(event: ChangeEvent<HTMLInputElement>) {
        setSelectedDate(event.target.value)
    }

    function handleChangeSelectedCity(event: SelectChangeEvent<string>) {
        const data = event.target.value.split("_")
        const [city, lat, long] = data
        setSelectedCity(city)
        setCoordinates({lat: Number(lat).toFixed(4), long:  Number(long).toFixed(4)})
    }


    return (
        <FormControl fullWidth>
            <FormLabel sx={{m: "2% 0"}}>
                <Typography variant="h6">{destinationType}</Typography>
            </FormLabel>
            <FormControl>
                <InputLabel id="country">Country</InputLabel>
                <Select
                    required
                    labelId="country"
                    id="country"
                    label="country"
                    onChange={handleChangeSelectedCountry}
                >
                    {countries.map(country =>
                        <MenuItem key={country.isoCode}
                                  value={country.isoCode}>{country.flag} {country.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {selectedCountry &&
                <FormControl>
                    <InputLabel id="city">City</InputLabel>
                    <Select
                        required
                        labelId="city"
                        id="city"
                        label="city"
                        onChange={handleChangeSelectedCity}
                    >
                        {cities!.map(city =>
                            <MenuItem key={`${city.name}_${city.latitude}_${city.longitude}`}
                                      value={`${city.name}_${city.latitude}_${city.longitude}`}>{city.name} - {city.stateCode}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            }
            <FormControl>
                <TextField
                    type="datetime-local"
                    label="Date"
                    variant="standard"
                    margin="dense"
                    name="date"
                    onChange={handleChangeSelectedDate}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        }
                    }}
                    sx={{mt: 2}}
                />
            </FormControl>
            {(handleDeleteInput && id) &&
                <Button onClick={() => handleDeleteInput(id)}>Delete</Button>
            }
        </FormControl>
    )
}
