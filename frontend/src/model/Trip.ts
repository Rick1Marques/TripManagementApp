import {Destination} from "./Destination.ts";
import {Event} from "./TripEvent.ts";

export type Trip = {
    id: string,
    title: string,
    description: string,
    reason: string,
    destinations: Destination[],
    events: Event[]
}
