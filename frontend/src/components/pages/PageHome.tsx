import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";
import {getLastAndNextTrips} from "../../util/getLastAndNextTrips.ts";
import {getCurrentDestination} from "../../util/getCurrentDestination.ts";
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import TripForm from "../forms/TripForm.tsx";
import TripSlideHome from "../TripSlideHome.tsx";
import LastTrip from "../LastTrip.tsx";
import { Stack} from "@mui/material";
import OnGoingTrip from "../OnGoingTrip.tsx";

export default function PageHome() {

    const [trips] = useFetchTrips()

    if (!trips) {
        return (
            <h1>Loading...</h1>
        )
    }
    const {onGoingTrip} = getTimeGroupedTrips(trips)
    const {lastTrip, nextTrip} = getLastAndNextTrips(trips)

    if (onGoingTrip.length === 0) {
        return (
            <Stack>
                <TripSlideHome trip={nextTrip} type="next"/>
                <TripSlideHome trip={lastTrip} type="last"/>
                <TripForm />
            </Stack>
        )
    } else {
        const currentlyTrip = onGoingTrip[0];
        const currentDestination = getCurrentDestination(currentlyTrip.destinations)
        return (
            <Stack>
                <OnGoingTrip trip={currentlyTrip} currentDestination={currentDestination}/>
                <TripForm/>
            </Stack>
        )
    }
}