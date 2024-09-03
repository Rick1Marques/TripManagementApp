import {Destination} from "../model/Destination.ts";

export function getCurrentDestination(destinations: Destination[]){
const currentDate = new Date();

    for (let i = 0; i < destinations.length; i++) {
        const destinationDate = new Date(destinations[i].date);
        const nextDestinationDate = i + 1 < destinations.length ? new Date(destinations[i + 1].date) : null;

        if (currentDate > destinationDate) {
            if (!nextDestinationDate || currentDate < nextDestinationDate) {
                return destinations[i];
            }
        }
    }
}