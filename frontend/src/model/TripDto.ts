import {Destination} from "./Destination.ts";

export type TripDto = {
    id: string,
    title: string,
    description: string,
    reason: string,
    destinations: Destination[]
}