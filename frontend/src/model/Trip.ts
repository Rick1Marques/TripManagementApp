import {Destination} from "./Destination.ts";
import {TripEvent} from "./TripEvent.ts";

export type Trip = {
    id: string,
    title: string,
    description: string,
    reason: string,
    destinations: Destination[],
    events: TripEvent[]
}

const emptyDestination = {
    id: "",
    country: "",
    city: "",
    coordinates: {
        latitude: "",
        longitude: ""
    },
    date: ""
}

export const emptyTrip: Trip = {
    id: "",
    title: "",
    description: "",
    reason: "",
    destinations: [emptyDestination, emptyDestination],
    events: []
}

