export type Event = {
    title: string,
    category: "RESTAURANT" | "COFFEE" | "BAR" | "BAKERY" | "THINGS_TO_DO" | "EVENT" | "HOTEL" | "TRANSPORT" | "MEETING" | "NOTE",
    description: string,
    address: string,
    city: string,
    country: string,
    date: string
}