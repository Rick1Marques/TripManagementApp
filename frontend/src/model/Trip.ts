import {Destination} from "./Destination.ts";
import {Event} from "./Event.ts";

export type Trip = {
    id: string,
    title: string,
    description: string,
    reason: string,
    destinations: Destination[],
    events: Event[]
}
