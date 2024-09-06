export type InputData = {
    country: string,
    city: string,
    coordinates: { latitude: string, longitude: string }
    date: string,
}

export const emptyInputData: InputData = {
    country: "",
    city: "",
    coordinates: {latitude: "", longitude: ""},
    date: ""
}