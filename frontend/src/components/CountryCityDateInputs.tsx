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
import {ChangeEvent, useEffect, useState} from "react";
import {TripEventTyped} from "../model/TripEventTyped.ts";

type InputData = {
    country: string,
    city: string,
    coordinates: { latitude: string, longitude: string }
    date: string,
}

type TripFormDestinationInputProps = {
    id?: number,
    name?: string,
    handleDeleteInput?: (id: number) => void,
    handleInputChange: (id: number | null, inputData: InputData) => void,
    tripEventTyped?: TripEventTyped
}

export default function CountryCityDateInputs({
                                                  id,
                                                  name,
                                                  handleDeleteInput,
                                                  handleInputChange,
                                                  tripEventTyped
                                              }: TripFormDestinationInputProps) {
    const countries = Country.getAllCountries()
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    const cities = City.getCitiesOfCountry(selectedCountry)
    const [selectedCity, setSelectedCity] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [coordinates, setCoordinates] = useState<{ latitude: string, longitude: string }>({
        latitude: "",
        longitude: ""
    })

    useEffect(() => {
        const countryName = selectedCountry ? Country.getCountryByCode(selectedCountry)!.name : "";
        const data: InputData = {
            country: countryName,
            city: selectedCity,
            coordinates,
            date: selectedDate,
        };

        if (selectedCountry || selectedCity || selectedDate) {
            if (id) {
                handleInputChange(id, data);
            } else {
                handleInputChange(null, data)
            }
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
        const [city, latitude, longitude] = data
        setSelectedCity(city)
        setCoordinates({latitude: Number(latitude).toFixed(4), longitude: Number(longitude).toFixed(4)})
    }


    return (
        <FormControl fullWidth>
            {name &&
            <FormLabel sx={{m: "2% 0"}}>
                <Typography variant="h6">{name}</Typography>
            </FormLabel>
            }
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
                <FormControl>
                    <InputLabel id="city">City</InputLabel>
                    <Select
                        disabled={selectedCountry === ""}
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
            <FormControl>
                <TextField
                    type="datetime-local"
                    label="Date"
                    variant="standard"
                    margin="dense"
                    onChange={handleChangeSelectedDate}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        }
                    }}
                    sx={{mt: 2}}
                    value={tripEventTyped?.date}
                />
            </FormControl>
            {(handleDeleteInput) &&
                <Button onClick={() => handleDeleteInput(id)}>Delete</Button>
            }
        </FormControl>
    )
}
