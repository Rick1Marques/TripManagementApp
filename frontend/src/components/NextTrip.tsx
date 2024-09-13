import {getDifferenceInDays} from "../util/getDifferenceInDays.ts";
import {Divider, Stack, Typography} from "@mui/material";
import {Trip} from "../model/Trip.ts";
import {getDate} from "../util/formatting.ts";
import WeatherForecast from "./WeatherForecast.tsx";
import {getListOfVisitedCities, getListOfVisitedCountries} from "../util/getListOfVisited.ts";

type NextTripProps = {
    trip: Trip
}

export default function NextTrip({trip}: NextTripProps) {

    const daysUntilStart = getDifferenceInDays(new Date(), new Date(trip.destinations[0].date));
    return (
        <Stack minHeight="300px" alignItems="center" gap=".5rem">
            <Typography variant="h4" gutterBottom>
                Next Trip
            </Typography>
            <Divider/>
            <Typography variant="h5" gutterBottom>
                {trip.title}
            </Typography>
            <Stack width="100%" direction="row">
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle2" gutterBottom>
                        Beginning
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {getDate(trip.destinations[0].date)}
                    </Typography>
                </Stack>

                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle2" gutterBottom>
                        First Stop
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {trip.destinations[1].city} - {trip.destinations[1].country.slice(0, 2).toUpperCase()}
                    </Typography>
                </Stack>
            </Stack>
            <Stack width="100%" direction="row">
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle2" gutterBottom>
                        Countries
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {getListOfVisitedCountries(trip).length}
                    </Typography>
                </Stack>

                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle2" gutterBottom>
                        Cities
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {getListOfVisitedCities(trip).length}
                    </Typography>
                </Stack>
            </Stack>
                    <Typography variant="subtitle2" gutterBottom>
                        {getDifferenceInDays(new Date(trip.destinations[0].date), new Date(trip.destinations[trip.destinations.length - 1].date))} days
                    </Typography>


            {/*<p>Days left: {daysUntilStart}</p>*/}

            <WeatherForecast trip={trip}/>
        </Stack>
    )
}