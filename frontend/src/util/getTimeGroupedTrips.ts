import {Trip} from "../model/Trip.ts";

export function getTimeGroupedTrips(trips: Trip[]){
    const currentDate = new Date()
    const pastTrips: Trip[] = []
    const futureTrips: Trip[] = []
    const ongoingTrip: Trip[] = []

    trips?.forEach(trip => {
        const startDate = new Date(trip.destinations[0].date)
        const returnDate = new Date(trip.destinations[trip.destinations.length - 1].date)
        if (startDate > currentDate) {
            futureTrips.push(trip)
        } else if (returnDate < currentDate) {
            pastTrips.push(trip)
        } else {
            ongoingTrip.push(trip)
        }
    })

    return {pastTrips, ongoingTrip, futureTrips}

}