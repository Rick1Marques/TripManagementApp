import {getFullDifferenceDates, getDifferenceInDaysDates} from "../util/getDifferenceDates.ts";
import {Button, Divider, Stack, Typography} from "@mui/material";
import {Trip} from "../model/Trip.ts";
import {getDate} from "../util/formatting.ts";
import {getListOfVisitedCities, getListOfVisitedCountries} from "../util/getListOfVisited.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import WeatherForecast from "./WeatherForecast.tsx";

type TripSlideHomeProps = {
    trip: Trip,
    type: "next" | "last" | "onGoing"
}

export default function TripSlideHome({trip, type}: TripSlideHomeProps) {
    const [countDownData, setCountDownData] = useState<string[]>(getFullDifferenceDates(new Date(), new Date(trip.destinations[0].date)));

    const countDownCaption = ["mths", "days", "hrs", "min", "sec"]
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/my-trips/${trip.id}`)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDownData(getFullDifferenceDates(new Date(), new Date(trip.destinations[0].date)));
        }, 1000);

        return () => clearInterval(interval);
    }, [trip]);



    return (
        <Stack alignItems="center" height="100vh" width="100vh" justifyContent="space-around" padding="0 .5rem .5rem">

            <Typography variant="h4">
                {type === "next" ? "Next Trip" : "Last Trip"}
            </Typography>

            <Typography variant="h5" gutterBottom>
                {trip.title}
            </Typography>

            <Stack width="100%" direction="row" >
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
                        {type === "next" ? "First Stop" : "End"}
                    </Typography>
                    <Typography variant="subtitle2">
                        {type === "next" ? `${trip.destinations[1].city} - ${trip.destinations[1].country.slice(0, 2).toUpperCase()}` :`${getDate(trip.destinations[trip.destinations.length - 1].date)}` }
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


            {type === "last" &&
                    <Stack direction="row" flexWrap="wrap" justifyContent="space-around" gap=".7rem">
                            {getListOfVisitedCities(trip).map(city =>
                                <Typography key={city} variant="caption">
                                    {city}
                                </Typography>
                            )}
                    </Stack>
            }


            {type === "next" &&
            <Stack direction="row" gap=".5rem">
                {countDownData.map((data, index) =>
                    <div key={index}>
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
                    </div>
                )}
            </Stack>
            }

            <Stack width="100%" direction="row" justifyContent="space-between">
                 <WeatherForecast disable={type === "last"} trip={trip}/>

                <Button variant="text" sx={{alignSelf: "end"}} size="small"
                        onClick={handleClick}>Details</Button>

            </Stack>
        </Stack>
    )
}