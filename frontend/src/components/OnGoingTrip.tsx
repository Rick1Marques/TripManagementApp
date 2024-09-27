import {Button, Stack, Typography} from "@mui/material";
import {getDifferenceInDaysDates} from "../util/getDifferenceDates.ts";
import {Trip} from "../model/Trip.ts";
import {Destination} from "../model/Destination.ts";
import WeatherForecast from "./WeatherForecast.tsx";
import {useNavigate} from "react-router-dom";
import TripTimeLine from "./TripTimeLine.tsx";
import {useContext} from "react";
import {ItineraryContext} from "../store/itinerary-context.tsx";
import TripForm from "./forms/TripForm.tsx";
import {Country} from "country-state-city";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

type OnGoingTripProps = {
    trip: Trip,
    currentDestination: Destination
}

export default function OnGoingTrip({trip, currentDestination}: OnGoingTripProps) {
    const navigate = useNavigate()
    const {handleIdChange} = useContext(ItineraryContext)

    const currentCountry = Country.getCountryByCode(currentDestination.countryIso)

    handleIdChange(trip.id || "");

    function handleClick(id: string) {
        navigate(`/my-trips/${id}`)
    }

    return (
        <Stack alignItems="center" height="100vh" width="100vw" padding="0 .5rem">

            <Stack height="20%" justifyContent="center">
                <Typography variant="h3">
                    {trip.title}
                </Typography>
            </Stack>

            <Stack height="15%" justifyContent="center">
                <Typography variant="h4">
                    Day {getDifferenceInDaysDates(new Date(), new Date(trip.destinations[0].date))}
                </Typography>
            </Stack>


            <Stack height="15%" direction="row" width="100%" alignItems="center">
                <Stack alignItems="center" width="33%">
                    <LocalPhoneIcon />
                    <Typography variant="subtitle1">
                        + {currentCountry?.phonecode}
                    </Typography>
                </Stack>
                <Stack alignItems="center" width="33%">
                    <Typography variant="h4">
                        {currentCountry?.flag}
                    </Typography>
                    <Typography variant="subtitle1">
                        {currentCountry?.name}
                    </Typography>
                </Stack>
                <Stack alignItems="center" width="33%">
                    <CurrencyExchangeIcon />
                    <Typography variant="subtitle1">
                        {currentCountry?.currency}
                    </Typography>
                </Stack>
            </Stack>


            <Stack height="45%" alignItems="center">
                <Typography variant="h4">
                    Plans
                </Typography>
                <TripTimeLine fullData={false}/>
            </Stack>


            <Stack height="12%" width="100%" direction="row" justifyContent="space-between" alignItems="center">
                <WeatherForecast disable={false} trip={trip} currentDestination={currentDestination}/>
                <TripForm/>
                <Button variant="text" size="small"
                        onClick={() => handleClick(trip.id)}>Details</Button>
            </Stack>


        </Stack>
    )
}