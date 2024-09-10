import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {Box, Button, Typography} from "@mui/material";
import {getDate, getTime} from "../util/formatting.ts";
import PlaceIcon from "@mui/icons-material/Place";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AirlineStopsRoundedIcon from "@mui/icons-material/AirlineStopsRounded";
import EventIcon from "@mui/icons-material/Event";
import EventForm from "./EventForm.tsx";
import {useContext} from "react";
import {ItineraryContext} from "../store/itinerary-context.tsx";

type TimeLineProps = {
    edit?: boolean
}

export default function TripTimeLine({edit}: TimeLineProps) {

    const {
        dataTimeLine,
        handleDeleteTripEvent,
        } = useContext( ItineraryContext)

    function handleDeleteEvent(index: number) {
        handleDeleteTripEvent(index)
    }


    return (
        <Timeline sx={{w: "100%"}}>
            {dataTimeLine.map((data, index) => {
                    return (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent >
                                <Box>
                                    <Typography>{getDate(data.date)}</Typography>
                                    <Typography>{getTime(data.date)}</Typography>
                                </Box>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                {index === 0 ?
                                    <PlaceIcon fontSize="large"/> :
                                    index === dataTimeLine.length - 1 ?
                                        <HomeRoundedIcon fontSize="large"/> :
                                        data.type === "destination" ?
                                            <AirlineStopsRoundedIcon fontSize="large"/> :
                                            <EventIcon/>
                                }

                                {index !== dataTimeLine.length - 1 && <TimelineConnector/>}
                            </TimelineSeparator>
                            <TimelineContent>
                                {data.type === "destination" ?
                                    `${data.country} - ${data.city}` :
                                    `${data.title}`
                                }
                                {}
                                {(data.type === "event" && edit )&&
                                        <Box>
                                            <EventForm index={index}
                                                       edit={true}
                                                       tripEventTyped={dataTimeLine[index]}/>
                                            <Button onClick={() => handleDeleteEvent(index)}>Delete</Button>
                                        </Box>
                                }
                            </TimelineContent>

                        </TimelineItem>
                    )
                }
            )}
        </Timeline>
    )
}