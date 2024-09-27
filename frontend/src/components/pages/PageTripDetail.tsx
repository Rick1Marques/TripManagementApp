import {useContext} from "react";
import {useParams} from "react-router-dom";
import TripTimeLine from "../TripTimeLine.tsx";
import {ItineraryContext} from "../../store/itinerary-context.tsx";
import { Stack, Typography} from "@mui/material";
import {getDate} from "../../util/formatting.ts";
import {getListOfVisitedCountries} from "../../util/getListOfVisited.ts";
import {getDifferenceInDaysDates} from "../../util/getDifferenceDates.ts";
import EditItinerary from "../EditItinerary.tsx";
import TripForm from "../forms/TripForm.tsx";


export default function PageTripDetail() {
    const {handleIdChange, tripData} = useContext(ItineraryContext)
    const {id} = useParams();

    handleIdChange(id || "");

    if (!tripData?.id) {
        return <h1>Loading...</h1>
    }

    return (
        <Stack alignItems="center" height="100vh" width="100vw" padding="0 .5rem">
            <Stack height="20%" marginTop="15px">
                <Typography gutterBottom variant="h4" alignSelf="center">
                    {tripData.title}
                </Typography>
            </Stack>

            <Stack height="50%" width="100%" gap="1rem" padding="0 5%" alignItems="center" >
                <Stack width="100%" direction="row" justifyContent="space-between" alignContent="center">
                    <Typography gutterBottom variant="h5">
                        General Information
                    </Typography>
                    <TripForm edit={true} trip={tripData}/>
                </Stack>

                <Stack>
                    <Typography variant="h6">
                        {getDate(tripData.destinations[0].date)} - {getDate(tripData.destinations[tripData.destinations.length - 1].date)}
                    </Typography>
                </Stack>


                <Stack width="100%" direction="row" justifyContent="center">
                    <Stack alignItems="center" justifyContent="center" width="50%">
                        <Typography variant="subtitle1">
                            Duration
                        </Typography>
                        <Typography variant="subtitle2">
                            {getDifferenceInDaysDates(new Date(tripData.destinations[0].date), new Date(tripData.destinations[tripData.destinations.length - 1].date))} days
                        </Typography>
                    </Stack>

                    <Stack alignItems="center" justifyContent="center" width="50%">
                        <Typography variant="subtitle1">
                            Reason
                        </Typography>
                        <Typography variant="subtitle2">
                            {tripData.reason}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack sx={{overflowY: "auto"}} direction="row" flexWrap="wrap" justifyContent="space-around"
                       alignContent="center" gap=".4rem" width="90%">
                    {getListOfVisitedCountries(tripData).map(data =>
                        <Typography key={data} variant="subtitle2">
                            {data}
                        </Typography>
                    )}
                </Stack>


                <Stack alignItems="center" justifyContent="center" width="50%">
                    <Typography variant="subtitle1">
                        Description
                    </Typography>
                    <Typography variant="subtitle2">
                        {tripData.description}
                    </Typography>
                </Stack>
            </Stack>

            <Stack width="100%" direction="row" justifyContent="space-between">
                <Typography marginLeft="5%" variant="h5">
                    Itinerary
                </Typography>
                <EditItinerary/>
            </Stack>
            <TripTimeLine fullData={true}/>
        </Stack>
    )
}