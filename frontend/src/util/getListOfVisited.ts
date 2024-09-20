import {Trip} from "../model/Trip.ts";

export function getListOfVisitedCountries(trip: Trip) {
    return trip.destinations.reduce((acc, destination) => {
        if (!acc.includes(destination.country)) {
            acc.push(destination.country)
        }
        return acc
    }, [] as string[])
}

export function getListOfVisitedCities(trip: Trip) {
    return trip.destinations.reduce((acc, destination) => {
        if (!acc.includes(destination.city)) {
            acc.push(`${destination.countryFlag} ${destination.city}` )
        }
        return acc
    }, [] as string[])
}


