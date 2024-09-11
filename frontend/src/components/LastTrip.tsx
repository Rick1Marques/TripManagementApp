import {Trip} from "../model/Trip.ts";
import {Box} from "@mui/material";

type LastTripProps = {
    trip: Trip
}
export default function LastTrip({trip}: LastTripProps){
    return (
        <Box>
            <h2>Last Trip</h2>
            <h3>{trip.title}</h3>
            <p>Date: {trip.destinations[0].date} - {trip.destinations[trip.destinations.length - 1].date
            }</p>
        </Box>
    )
}