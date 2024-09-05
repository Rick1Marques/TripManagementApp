import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";
import {getLastAndNextTrips} from "../../util/getLastAndNextTrips.ts";
import {getDifferenceInDays} from "../../util/getDifferenceInDays.ts";
import {getCurrentDestination} from "../../util/getCurrentDestination.ts";
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import TripForm from "../TripForm.tsx";

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
            <>
                <section>
                    <h2>Next Trip</h2>
                    <h3>{nextTrip.title}</h3>
                    <p>Starting date: {nextTrip.destinations[0].date}</p>
                    <p>Days left: {getDifferenceInDays(new Date(), new Date(nextTrip.destinations[0].date))}</p>
                </section>
                <section>
                    <h2>Last Trip</h2>
                    <h3>{lastTrip.title}</h3>
                    <p>Date: {lastTrip.destinations[0].date} - {lastTrip.destinations[lastTrip.destinations.length - 1].date
                    }</p>
                </section>
                 <TripForm/>

            </>
        )
    } else {
        const currentlyTrip = onGoingTrip[0];
        const currentDestination = getCurrentDestination(currentlyTrip.destinations)
        return (
            <>
                <h1>{currentlyTrip.title}</h1>
                <h2>Day {getDifferenceInDays(new Date(), new Date(currentlyTrip.destinations[0].date))}</h2>
                <h3>{currentDestination!.city}</h3>
                <h3>{currentDestination!.country}</h3>
                 <TripForm/>
            </>
        )
    }

}