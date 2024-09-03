import {Trip} from "../model/Trip.ts";
import {getTimeGroupedTrips} from "./getTimeGroupedTrips.ts";

export function getLastAndNextTrips(trips: Trip[]) {
    const {pastTrips, futureTrips} = getTimeGroupedTrips(trips)

    const lastTrip = pastTrips.reduce((latest, current) => {
        const currentTripDate = current.destinations[0].date
        const latestTripDate = latest.destinations[0].date
        return currentTripDate > latestTripDate ? current : latest
    }, pastTrips[0])

    const nextTrip = futureTrips.reduce((latest, current) => {
        const currentTripDate = current.destinations[0].date
        const latestTripDate = latest.destinations[0].date
        return currentTripDate < latestTripDate ? current : latest
    }, futureTrips[0])

    return {lastTrip, nextTrip}

}