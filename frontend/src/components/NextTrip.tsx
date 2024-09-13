import {getFullDifferenceDates, getDifferenceInDaysDates} from "../util/getDifferenceDates.ts";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {Trip} from "../model/Trip.ts";
import {getDate} from "../util/formatting.ts";
import WeatherForecast from "./WeatherForecast.tsx";
import {getListOfVisitedCities, getListOfVisitedCountries} from "../util/getListOfVisited.ts";
import {useEffect, useState} from "react";

type NextTripProps = {
    trip: Trip
}

export default function NextTrip({trip}: NextTripProps) {
    const [countDownData, setCountDownData] = useState<string[]>(getFullDifferenceDates(new Date(), new Date(trip.destinations[0].date)));
    const countDownCaption = ["mths", "days", "hrs", "min", "sec"]


    useEffect(() => {
        const interval = setInterval(() => {
            setCountDownData(getFullDifferenceDates(new Date(), new Date(trip.destinations[0].date)));
        }, 1000);

        return () => clearInterval(interval);
    }, [trip]);

    return (
        <Stack alignItems="center" gap=".7rem">
            <Typography variant="h4">
                Next Trip
            </Typography>
            <Divider/>
            <Typography variant="h5" gutterBottom>
                {trip.title}
            </Typography>
            <Stack width="100%" direction="row" justifyContent="center">
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1" gutterBottom>
                        Beginning
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {getDate(trip.destinations[0].date)}
                    </Typography>
                </Stack>

                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1" gutterBottom>
                        First Stop
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {trip.destinations[1].city} - {trip.destinations[1].country.slice(0, 2).toUpperCase()}
                    </Typography>
                </Stack>
            </Stack>


            <Stack alignItems="center">
                <Typography variant="h4">
                    {getDifferenceInDaysDates(new Date(trip.destinations[0].date), new Date(trip.destinations[trip.destinations.length - 1].date))}
                </Typography>
                <Typography variant="caption">
                    days
                </Typography>
            </Stack>

            <Stack width="100%" direction="row" justifyContent="center">
                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1" gutterBottom>
                        Countries
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {getListOfVisitedCountries(trip).length}
                    </Typography>
                </Stack>

                <Stack alignItems="center" width="50%">
                    <Typography variant="subtitle1" gutterBottom>
                        Cities
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {getListOfVisitedCities(trip).length}
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction="row" gap=".5rem">
                {countDownData.map((data, index) =>
                    <>
                        <Stack alignItems="center">
                            <Typography variant="h4" gutterBottom>
                                {data}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                                {countDownCaption[index]}
                            </Typography>
                        </Stack>
                        {index !== countDownCaption.length - 1 &&
                            <Divider orientation="vertical" variant="middle" flexItem/>}
                    </>
                )}
            </Stack>
            <WeatherForecast trip={trip}/>
        </Stack>
    )
}