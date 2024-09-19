import {useContext} from "react";
import {useParams} from "react-router-dom";
import TripTimeLine from "../TripTimeLine.tsx";
import {ItineraryContext} from "../../store/itinerary-context.tsx";
import {Divider, Stack, Typography} from "@mui/material";
import {getDate} from "../../util/formatting.ts";
import {getListOfVisitedCities, getListOfVisitedCountries} from "../../util/getListOfVisited.ts";
import {getDifferenceInDaysDates} from "../../util/getDifferenceDates.ts";
import EditItinerary from "../EditItinerary.tsx";


export default function PageTripDetail() {
    const {handleIdChange, tripData} = useContext(ItineraryContext)
    const {id} = useParams();

    handleIdChange(id || "");

if(!tripData?.id){
    return <h1>Loading...</h1>
}
console.log(tripData)
    return (
        <Stack gap="1rem">
            <Typography gutterBottom variant="h4" alignSelf="center">
                {tripData.title}
            </Typography>
            <Stack gap="5px">
                <Typography gutterBottom variant="h5">
                    General Information
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Duration: {getDifferenceInDaysDates(new Date(tripData.destinations[0].date), new Date(tripData.destinations[tripData.destinations.length - 1].date))} days
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Date: {getDate(tripData.destinations[0].date)} - {getDate(tripData.destinations[tripData.destinations.length - 1].date)}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Reason: {tripData.reason}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Description: {tripData.description}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Countries: {getListOfVisitedCountries(tripData).join(" - ")}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Cities: {getListOfVisitedCities(tripData).join(" - ")}
                </Typography>
            </Stack>
            <Divider/>
            <Stack direction="row" justifyContent="space-between">
            <Typography gutterBottom variant="h5">
                Itinerary
            </Typography>
                <EditItinerary/>
            </Stack>
            <TripTimeLine/>
        </Stack>
    )
}