import {Destination} from "./Destination.ts";

export type TripDto = {
    title: string,
    description: string,
    reason: string,
    destinations: Destination[]
}