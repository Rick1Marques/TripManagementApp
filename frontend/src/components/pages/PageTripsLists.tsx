import TripsList from "../TripsList.tsx";
import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import {Box, Stack} from "@mui/material";

export default function PageTripsLists() {

    const [trips] = useFetchTrips()


    if (!trips) {
        return (
            <h1>Loading...</h1>
        )
    }

    const {pastTrips, onGoingTrip, futureTrips} = getTimeGroupedTrips(trips)

    return (
        <Box>
            <Stack>
                <TripsList title="On going Trip" list={onGoingTrip}/>
                <TripsList title="Future Trips" list={futureTrips}/>
                <TripsList title="Past Trips" list={pastTrips}/>
            </Stack>
        </Box>
    )
}