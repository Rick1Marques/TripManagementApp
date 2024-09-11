import {getDifferenceInDays} from "../util/getDifferenceInDays.ts";
import {Box} from "@mui/material";
import {Trip} from "../model/Trip.ts";

type NextTripProps = {
    trip: Trip
}

export default function NextTrip({trip}: NextTripProps){
    return (
        <Box>
            <h2>Next Trip</h2>
            <h3>{trip.title}</h3>
            <p>Starting date: {trip.destinations[0].date}</p>
            <p>Days left: {getDifferenceInDays(new Date(), new Date(trip.destinations[0].date))}</p>
        </Box>
    )
}