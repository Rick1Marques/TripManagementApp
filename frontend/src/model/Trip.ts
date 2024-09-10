import {Destination} from "./Destination.ts";
import { TripEvent} from "./TripEvent.ts";

export type Trip = {
    id: string,
    title: string,
    description: string,
    reason: string,
    destinations: Destination[],
    events: TripEvent[]
}

export const emptyTrip: Trip = {
    id: "",
    title: "",
    description: "",
    reason: "",
    destinations: [],
    events: []
}