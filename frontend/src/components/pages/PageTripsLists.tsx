import {useEffect, useState} from "react";
import axios from "axios";
import {Trip} from "../../model/Trip.ts";
import TripsList from "../TripsList.tsx";
import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";

export default function PageTripsLists() {
    const [trips, setTrips] = useState<Trip[] | null>(null)

    useEffect(() => {
        async function fetchTrips() {
            try {
                const response = await axios.get("/api/trips")
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


    if (!trips) {
        return (
            <h1>Loading...</h1>
        )
    }

    const {pastTrips, onGoingTrips, futureTrips} = getTimeGroupedTrips(trips)

    return (
        <>
            <TripsList title="On going Trip" list={onGoingTrips} />
            <TripsList title="Future Trips" list={futureTrips} />
            <TripsList title="Past Trips" list={pastTrips} />
        </>
    )
}