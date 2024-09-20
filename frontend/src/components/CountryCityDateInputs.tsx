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
import {City, Country, ICity} from "country-state-city";
import {ChangeEvent, useEffect, useState} from "react";
import {TripEventTyped} from "../model/TripEventTyped.ts";

type InputData = {
    country: string,
    countryIso: string,
    countryFlag: string,
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
    const [selectedCountry, setSelectedCountry] = useState<string>(tripEventTyped?.countryIso || "")
    const cities = City.getCitiesOfCountry(selectedCountry)
    let city: ICity
    if (tripEventTyped) {
        city = cities?.find(c => c.name === tripEventTyped?.city)
    }
    const [selectedCity, setSelectedCity] = useState<string>(city?.name || "")
    const [selectedDate, setSelectedDate] = useState<string>(tripEventTyped?.date || "")
    const [coordinates, setCoordinates] = useState<{ latitude: string, longitude: string }>({
        latitude: city.latitude,
        longitude: city.latitude
    })

    useEffect(() => {
        const country = Country.getCountryByCode(selectedCountry);
        const countryName = selectedCountry ? country!.name : "";
        const countryFlag = selectedCountry ? country!.flag : "";
        const data: InputData = {
            country: countryName,
            countryIso: selectedCountry,
            countryFlag,
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
        setSelectedCity("")
        setCoordinates({latitude: "", longitude: ""})
    }

    function handleChangeSelectedDate(event: ChangeEvent<HTMLInputElement>) {
        setSelectedDate(event.target.value)
    }

    function handleChangeSelectedCity(event: SelectChangeEvent<string>) {
        const cityName = event.target.value
        setSelectedCity(cityName)
        const city = cities!.find(c => c.name === cityName)
        setCoordinates({latitude: Number(city.latitude).toFixed(4), longitude: Number(city.longitude).toFixed(4)})
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
                    defaultValue={selectedCountry}
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
                    defaultValue={selectedCity}
                >
                    {cities!.map(city =>
                        <MenuItem key={`${city.name}_${city.latitude}_${city.longitude}`}
                                  value={city.name}>{city.name} - {city.stateCode}</MenuItem>
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
                    value={selectedDate}
                />
            </FormControl>
            {(handleDeleteInput) &&
                <Button onClick={() => handleDeleteInput(id)}>Delete</Button>
            }
        </FormControl>
    )
}
