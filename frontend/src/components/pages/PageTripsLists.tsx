import TripsList from "../TripsList.tsx";
import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import { Stack} from "@mui/material";

export default function PageTripsLists() {

    const [trips] = useFetchTrips()


    if (!trips) {
        return (
            <h1>Loading...</h1>
        )
    }

    const {pastTrips, ongoingTrip, futureTrips} = getTimeGroupedTrips(trips)

    return (
        <Stack>
            <TripsList title="Ongoing Trips" list={ongoingTrip}/>
            <TripsList title="Future Trips" list={futureTrips}/>
            <TripsList title="Past Trips" list={pastTrips}/>
        </Stack>
    )
}