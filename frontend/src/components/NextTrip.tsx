import {getDifferenceInDays} from "../util/getDifferenceInDays.ts";
import {Box} from "@mui/material";
import {Trip} from "../model/Trip.ts";
import {getDate} from "../util/formatting.ts";
import WeatherForecast from "./WeatherForecast.tsx";

type NextTripProps = {
    trip: Trip
}

export default function NextTrip({trip}: NextTripProps) {

    const daysUntilStart = getDifferenceInDays(new Date(), new Date(trip.destinations[0].date));
    return (
        <Box>
            <h2>Next Trip</h2>
            <h3>{trip.title}</h3>
            <p>Starting date: {getDate(trip.destinations[0].date)}</p>
            <p>Days left: {daysUntilStart}</p>
            <WeatherForecast trip={trip}/>
        </Box>
    )
}