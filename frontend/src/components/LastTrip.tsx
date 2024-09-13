import {Trip} from "../model/Trip.ts";
import { Button, Divider, Stack, Typography} from "@mui/material";
import {getDate} from "../util/formatting.ts";
import {getDifferenceInDaysDates} from "../util/getDifferenceDates.ts";
import {getListOfVisitedCities, getListOfVisitedCountries} from "../util/getListOfVisited.ts";
import {useNavigate} from "react-router-dom";

type LastTripProps = {
    trip: Trip
}
export default function LastTrip({trip}: LastTripProps){
    const navigate = useNavigate()

    function handleClick(id: string) {
        navigate(`/my-trips/${id}`)
    }
    return (
        <Stack alignItems="center" height="100vh" justifyContent="space-around" padding="0 .5rem .5rem">

            <Typography variant="h4">
                Next Trip
            </Typography>

            <Divider/>

            <Typography variant="h5" gutterBottom>
                {trip.title}
            </Typography>

            <Stack width="100%" direction="row" justifyContent="center">
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1">
                        Beginning
                    </Typography>
                    <Typography variant="subtitle2">
                        {getDate(trip.destinations[0].date)}
                    </Typography>
                </Stack>
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1">
                        First Stop
                    </Typography>
                    <Typography variant="subtitle2">
                        {trip.destinations[1].city} - {trip.destinations[1].country.slice(0, 2).toUpperCase()}
                    </Typography>
                </Stack>
            </Stack>

            <Stack alignItems="center">
                <Typography variant="caption">
                    Duration
                </Typography>
                <Typography variant="h4">
                    {getDifferenceInDaysDates(new Date(trip.destinations[0].date), new Date(trip.destinations[trip.destinations.length - 1].date))}
                </Typography>
                <Typography variant="caption">
                    days
                </Typography>
            </Stack>

            <Stack width="100%" direction="row" justifyContent="center">
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1">
                        Countries
                    </Typography>
                    <Typography variant="subtitle2">
                        {getListOfVisitedCountries(trip).length}
                    </Typography>
                </Stack>
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1">
                        Cities
                    </Typography>
                    <Typography variant="subtitle2">
                        {getListOfVisitedCities(trip).length}
                    </Typography>
                </Stack>
            </Stack>


            <Stack width="100%" direction="row" justifyContent="space-between">
                <Button variant="text" sx={{alignSelf: "end"}} size="small"
                        onClick={() => handleClick(trip.id)}>Details</Button>

            </Stack>
        </Stack>
    )
}