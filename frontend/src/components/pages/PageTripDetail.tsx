import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Trip} from "../../model/Trip.ts";
import {
    Timeline,
    TimelineConnector, TimelineContent,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import PlaceIcon from '@mui/icons-material/Place';
import AirlineStopsRoundedIcon from '@mui/icons-material/AirlineStopsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {getDate, getTime} from "../../util/formatting.ts";
import {Box, Typography} from "@mui/material";
import EventForm from "../EventForm.tsx";
import EventIcon from '@mui/icons-material/Event';

export default function PageTripDetail() {
    const {id} = useParams();
    const [tripData, setTripData] = useState<Trip | null>(null)

    useEffect(() => {
        async function fetchTrip() {
            try {
                const response = await axios.get(`/api/trips/${id}`)
                if (response.status === 200) {
                    const tripData: Trip = await response.data
                    setTripData(tripData)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchTrip()
    }, [id])

    if (!tripData) {
        return <h1>Loading...</h1>
    }

    const destinationsTyped = tripData.destinations.map(destination => {
        return {
            ...destination,
            date: destination.date,
            type: "destination"
        }
    });

    const eventsTyped = tripData.events.map(event => {
        return {
            ...event,
            date: event.date,
            type: "event"
        }
    });

    const dataTimeLine = [...destinationsTyped, ...eventsTyped]

        dataTimeLine.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
    });

    console.log(dataTimeLine)

    return (
        <>
            <p>{tripData.title}</p>
            <p>{tripData.reason}</p>
            <p>{tripData.description}</p>
            <EventForm tripData={tripData}/>
            <Timeline>
                {dataTimeLine.map((data, index) => {
                        return (
                            <TimelineItem key={index}>
                                <TimelineOppositeContent color="primary">
                                    <Box>
                                        <Typography>{getDate(data.date)}</Typography>
                                        <Typography>{getTime(data.date)}</Typography>
                                    </Box>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    {index === 0 ?
                                        <PlaceIcon fontSize="large"/> :
                                        index === dataTimeLine.length -1 ?
                                            <HomeRoundedIcon fontSize="large"/> :
                                            data.type === "destination" ?
                                            <AirlineStopsRoundedIcon fontSize="large"/> :
                                    <EventIcon />
                                    }

                                    {index !== dataTimeLine.length - 1 && <TimelineConnector/>}
                                </TimelineSeparator>
                                <TimelineContent>
                                    {data.type === "destination" ?
                                        `${data.country} - ${data.city}` :
                                    `${data.title}`
                                    }

                                </TimelineContent>
                            </TimelineItem>
                        )
                    }
                )}
            </Timeline>
        </>
    )
}