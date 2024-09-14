import {Button, Stack, Typography} from "@mui/material";
import {getDifferenceInDaysDates} from "../util/getDifferenceDates.ts";
import {Trip} from "../model/Trip.ts";
import {Destination} from "../model/Destination.ts";
import WeatherForecast from "./WeatherForecast.tsx";
import {useNavigate} from "react-router-dom";
import TripTimeLine from "./TripTimeLine.tsx";
import {useContext} from "react";
import {ItineraryContext} from "../store/itinerary-context.tsx";

type OnGoingTripProps = {
    trip: Trip,
    currentDestination: Destination
}

export default function OnGoingTrip({trip, currentDestination}: OnGoingTripProps) {
    const navigate = useNavigate()
    const {handleIdChange} = useContext(ItineraryContext)

    handleIdChange(trip.id || "");

    function handleClick(id: string) {
        navigate(`/my-trips/${id}`)
    }


    return (
        <Stack alignItems="center" height="100vh" justifyContent="space-around" padding="0 .5rem .5rem">

            <Typography variant="h4">
                {trip.title}
            </Typography>

            <Typography variant="h5" gutterBottom>
                Day {getDifferenceInDaysDates(new Date(), new Date(trip.destinations[0].date))}
            </Typography>

            <Stack direction="row" justifyContent="space-around" width="100%">
                <Stack alignItems="center" width="50%">
                <Typography variant="h6" gutterBottom>
                    {currentDestination!.city}
                </Typography>
                </Stack>
                <Stack alignItems="center" width="50%">
                <Typography variant="h6" gutterBottom>
                    {currentDestination!.country}
                </Typography>
                </Stack>
            </Stack>

            <Stack alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Your Day
                </Typography>
            <TripTimeLine fullData={false}/>
            </Stack>

            <Stack width="100%" direction="row" justifyContent="space-between">
                 <WeatherForecast disable={false} trip={trip}/>
                <Button variant="text" sx={{alignSelf: "end"}} size="small"
                        onClick={() => handleClick(trip.id)}>Details</Button>
            </Stack>


        </Stack>
)
}