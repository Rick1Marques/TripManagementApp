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
import {useState} from "react";

type TripFormDestinationInputProps = {
    id?: number,
    destinationType: string
    handleDeleteInput?: (id: number) => void,
}

export default function TripFormDestinationInput({
                                                     id,
                                                     destinationType,
                                                     handleDeleteInput
                                                 }: TripFormDestinationInputProps) {
    const countries = Country.getAllCountries()
    const [selectedCountry, setSelectedCountry] = useState<string>("")
    const cities = City.getCitiesOfCountry(selectedCountry)

    function handleChangeSelectedCountry(event: SelectChangeEvent<string>) {
        setSelectedCountry(event.target.value)
    }


    return (
        <FormControl fullWidth>
            <FormLabel sx={{m: "2% 0"}}>
                <Typography variant="h6">{destinationType}</Typography>
            </FormLabel>
            <FormControl >
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
                <FormControl >
                    <InputLabel id="city">City</InputLabel>
                    <Select
                        required
                        labelId="city"
                        id="city"
                        label="city"
                    >
                        {cities!.map(city =>
                            <MenuItem key={`${city.name}-${city.latitude}-${city.longitude}`}
                                      value={`${city.name}-${city.latitude}-${city.longitude}`}>{city.name}-{city.stateCode}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            }
            <FormControl >
                <TextField
                    type="datetime-local"
                    label="Date"
                    variant="standard"
                    margin="dense"
                    name="date"
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
