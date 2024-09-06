import {Category} from "./Category.ts";

export type Event = {
    title: string,
    category: Category,
    description: string,
    address: string,
    city: string,
    country: string,
    date: string
}