import {Destination} from "./Destination.ts";

export type Trip = {
    id: string,
    title: string,
    description: string,
    reason: string,
    destinations: Destination[]
}