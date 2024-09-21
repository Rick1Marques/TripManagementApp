import {
    Button,
    FormControl,
    FormLabel,
    TextField,
    Typography
} from "@mui/material";
import {City, Country, ICity, ICountry} from "country-state-city";
import {ChangeEvent, useEffect, useState} from "react";
import {TripEventTyped} from "../model/TripEventTyped.ts";
import {DestinationTyped} from "../model/DestinationTyped.ts";
import Autocomplete from '@mui/material/Autocomplete';

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
    tripEventTyped?: TripEventTyped,
    destinationTyped?: DestinationTyped
}

export default function CountryCityDateInputs({
                                                  id,
                                                  name,
                                                  handleDeleteInput,
                                                  handleInputChange,
                                                  tripEventTyped,
                                                  destinationTyped
                                              }: TripFormDestinationInputProps) {
    const countries = Country.getAllCountries()
    let country = ""
    if (tripEventTyped) {
        country = tripEventTyped?.countryIso
    } else if (destinationTyped) {
        country = destinationTyped?.countryIso
    }
    const [selectedCountry, setSelectedCountry] = useState<string>(country)

    const cities = City.getCitiesOfCountry(selectedCountry) || []
    const city = tripEventTyped
        ? cities.find(c => c.name === tripEventTyped?.city)
        : destinationTyped
            ? cities.find(c => c.name === destinationTyped?.city)
            : undefined;

    const [selectedCity, setSelectedCity] = useState<string>(city?.name || "")

    let date = ""
    if (tripEventTyped) {
        date = tripEventTyped?.date
    } else if (destinationTyped) {
        date = destinationTyped?.date
    }
    const [selectedDate, setSelectedDate] = useState<string>(date)
    const [coordinates, setCoordinates] = useState<{ latitude: string, longitude: string }>({
        latitude: city?.latitude || "",
        longitude: city?.latitude || ""
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


    function handleChangeSelectedDate(event: ChangeEvent<HTMLInputElement>) {
        setSelectedDate(event.target.value)
    }


    return (
        <FormControl fullWidth>
            {name &&
                <FormLabel sx={{m: "2% 0"}}>
                    <Typography variant="h6">{name}</Typography>
                </FormLabel>
            }
            <FormControl>
                <Autocomplete
                    id="country"
                    options={countries}
                    value={Country.getCountryByCode(selectedCountry)}
                    getOptionLabel={(option: ICountry) => `${option.flag} ${option.name}`}
                    onChange={(_event, newValue) => {
                        if (newValue) {
                            setSelectedCountry(newValue.isoCode);
                            setCoordinates({latitude: "", longitude: ""});
                        } else {
                            setSelectedCountry("");
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Country"
                        />
                    )}
                />
            </FormControl>
            <FormControl>
                <Autocomplete
                    id="city"
                    disabled={!selectedCountry}
                    options={cities}
                    value={cities?.find(c => c.name === selectedCity)}
                    getOptionLabel={(option: ICity) => `${option.name} - ${option.stateCode}`}
                    onChange={(_event, newValue) => {
                        if (newValue) {
                            setSelectedCity(newValue.name);
                            setCoordinates({
                                latitude: Number(newValue.latitude).toFixed(4),
                                longitude: Number(newValue.longitude).toFixed(4),
                            })
                        } else {
                            setSelectedCity("");
                            setCoordinates({
                                latitude:"",
                                longitude:""
                            })
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="City"
                        />
                    )}
                />
            </FormControl>
            <FormControl>
                <TextField
                    defaultValue={selectedDate}
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
                />
            </FormControl>
            {(handleDeleteInput && id !== undefined) &&
                <Button onClick={() => handleDeleteInput(id)}>Delete</Button>
            }
        </FormControl>
    )
}
