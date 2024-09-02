import {useEffect, useState} from "react";
import axios from "axios";
import {Trip} from "../../model/Trip.ts";
import TripsList from "../TripsList.tsx";

export default function PageTripsLists() {
    const [trips, setTrips] = useState<Trip[] | null>(null)

    useEffect(() => {
        async function fetchTrips() {
            try {
                const response = await axios.get("api/trips")
                if (response.status === 200) {
                    const tripsData = await response.data
                    setTrips(tripsData)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchTrips()
    }, [])


    const currentDate = new Date()
    const pastTrips: Trip[] = []
    const futureTrips: Trip[] = []
    const onGoingTrips: Trip[] = []


    trips?.forEach(trip => {
        const startDate = new Date(trip.destinations[0].date)
        const returnDate = new Date(trip.destinations[trip.destinations.length - 1].date)
        if (startDate > currentDate) {
            futureTrips.push(trip)
        } else if (returnDate < currentDate) {
            pastTrips.push(trip)
        } else {
            onGoingTrips.push(trip)
        }
    })

    if (!trips) {
        return (
            <h1>Loading...</h1>
        )
    }


    return (
        <>
            <TripsList title="On going Trips" list={onGoingTrips}/>
            <TripsList title="Future Trips" list={futureTrips}/>
            <TripsList title="Past Trips" list={pastTrips}/>
        </>
    )
}