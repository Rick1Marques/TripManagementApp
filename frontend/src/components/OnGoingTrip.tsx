import {Box} from "@mui/material";
import {getDifferenceInDaysDates} from "../util/getDifferenceDates.ts";
import {Trip} from "../model/Trip.ts";
import {Destination} from "../model/Destination.ts";

type OnGoingTripProps = {
    trip: Trip,
    currentDestination: Destination
}

export default function OnGoingTrip({trip, currentDestination}: OnGoingTripProps){
    return (
        <Box>
            <h1>{trip.title}</h1>
            <h2>Day {getDifferenceInDaysDates(new Date(), new Date(trip.destinations[0].date))}</h2>
            <h3>{currentDestination!.city}</h3>
            <h3>{currentDestination!.country}</h3>
        </Box>
    )
}