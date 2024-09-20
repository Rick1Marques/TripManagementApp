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
import {DestinationTyped} from "../model/DestinationTyped.ts";
import {TripEventTyped} from "../model/TripEventTyped.ts";

type TimeLineProps = {
    edit?: boolean,
    fullData: boolean
}

export default function TripTimeLine({edit, fullData=true}: TimeLineProps) {

    const {
        dataTimeLine,
        handleDeleteTripEventDestination,
    } = useContext(ItineraryContext)

    function handleDeleteEvent(index: number) {
        handleDeleteTripEventDestination(index)
    }

    function groupDataByDate(data: (TripEventTyped | DestinationTyped)[]) {
        return data.reduce((acc, data) => {
            const key: string = getDate(data.date)

            if (!acc[key]) {
                acc[key] = []
            }

            acc[key].push(data)
            return acc;

        }, {} as Record<string, (DestinationTyped | TripEventTyped)[]>)
    }

    const groupedDataByDate = groupDataByDate(dataTimeLine)[getDate(new Date().toString())]

    let dataToRender: (DestinationTyped | TripEventTyped)[]

    if(fullData){
        dataToRender = dataTimeLine
    } else {
        dataToRender = groupedDataByDate
    }


    if (!dataToRender) {
        return <h1>You have nothing planed for today</h1>
    }
    return (
        <Timeline sx={{width: "100%"}}>
            {dataToRender.map((data, index) => {
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
                                                paddingTop={0}>{`${data.countryFlag} ${data.city}`}</Typography>
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