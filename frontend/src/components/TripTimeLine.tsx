import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {Button, Stack, Typography} from "@mui/material";
import {getDate, getTime} from "../util/formatting.ts";
import PlaceIcon from "@mui/icons-material/Place";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AirlineStopsRoundedIcon from "@mui/icons-material/AirlineStopsRounded";
import EventIcon from "@mui/icons-material/Event";
import EventForm from "./forms/EventForm.tsx";
import {useContext} from "react";
import {ItineraryContext} from "../store/itinerary-context.tsx";
import DestinationForm from "./forms/DestinationForm.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

type TimeLineProps = {
    edit?: boolean
}

export default function TripTimeLine({edit}: TimeLineProps) {

    const {
        dataTimeLine,
        handleDeleteTripEventDestination,
    } = useContext(ItineraryContext)

    function handleDeleteEvent(index: number) {
        handleDeleteTripEventDestination(index)
    }

    return (
        <Timeline sx={{width: "100%"}}>
            {dataTimeLine.map((data, index) => {
                return (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent>
                            <Typography variant="body1">{getDate(data.date)}</Typography>
                            <Typography variant="body2">{getTime(data.date)}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {data.type === "starting-point" ?
                                <PlaceIcon fontSize="large"/> :
                                data.type === "home" ?
                                    <HomeRoundedIcon fontSize="large"/> :
                                    data.type === "destination" ?
                                        <AirlineStopsRoundedIcon fontSize="large"/> :
                                        <EventIcon fontSize="large"/>
                            }

                            {index !== dataTimeLine.length - 1 && <TimelineConnector/>}
                        </TimelineSeparator>
                        <TimelineContent>
                            {data.type !== "event" ?
                                <Typography variant="body1"
                                            paddingTop={0}>{`${data.country} - ${data.city}`}</Typography>
                                :
                                <Typography variant="body1">{`${data.title}`}</Typography>

                            }

                            {(data.type !== "event" && edit) &&
                                <Stack maxWidth="100px" direction="row" justifyContent="space-between">
                                    <DestinationForm index={index} edit={true} destinationType={data.type}/>
                                    <Button variant="text"
                                            disabled={data.type !== "destination"}
                                            onClick={() => handleDeleteEvent(index)}><DeleteIcon/></Button>
                                </Stack>
                            }


                                {(data.type === "event" && edit) &&
                                <Stack maxWidth="100px" direction="row" justifyContent="space-between">
                                    <EventForm index={index}
                                               edit={true}
                                               tripEventTyped={dataTimeLine[index]}/>
                                    <Button variant="text"
                                            onClick={() => handleDeleteEvent(index)}><DeleteIcon/></Button>
                                </Stack>
                            }
                                </TimelineContent>

                                </TimelineItem>
                                )
                            }
            )}
        </Timeline>
    )
}