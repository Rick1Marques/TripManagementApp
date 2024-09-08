import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {Box, Typography} from "@mui/material";
import {getDate, getTime} from "../util/formatting.ts";
import PlaceIcon from "@mui/icons-material/Place";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AirlineStopsRoundedIcon from "@mui/icons-material/AirlineStopsRounded";
import EventIcon from "@mui/icons-material/Event";
import {DestinationTyped} from "../model/DestinationTyped.ts";
import {TripEventTyped} from "../model/TripEventTyped.ts";

type TimeLineProps = {
    dataTimeLine: (DestinationTyped | TripEventTyped)[]
}

export default function TripTimeLine({dataTimeLine}:TimeLineProps) {
    return(
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
    )
}