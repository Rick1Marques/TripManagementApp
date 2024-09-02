import {Trip} from "../model/Trip.ts";

type TripsListProps = {
title: string,
 list: Trip[]
}

export default function TripsList({title, list}:TripsListProps){
    return (
        <>
            <h2>{title}</h2>
            <ul>
                {list.map(trip => <p key={trip.id}>{trip.title}</p>)}
            </ul>
        </>
    )
}