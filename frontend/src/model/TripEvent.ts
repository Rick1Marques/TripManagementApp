import {Category} from "./Category.ts";

export type TripEvent = {
    id: string,
    title: string,
    category: Category,
    description: string,
    address: string,
    city: string,
    country: string,
    date: string
}